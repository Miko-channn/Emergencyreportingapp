import { useState, useEffect } from 'react';
import { MapPin, Navigation, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LocationPickerProps {
  value: string;
  onChange: (location: string, coordinates?: { lat: number; lng: number }) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [useMap, setUseMap] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC

  useEffect(() => {
    if (coordinates) {
      onChange(`${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`, coordinates);
    }
  }, [coordinates]);

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(coords);
          setMapPosition(coords);
          setIsLoadingLocation(false);
        },
        (error) => {
          setIsLoadingLocation(false);
          let errorMessage = 'Таны байршлыг авах боломжгүй байна. ';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Хөтчийн тохиргооноос байршлын зөвшөөрлийг идэвхжүүлнэ үү.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Байршлын мэдээлэл боломжгүй байна.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Байршил авах хүсэлт хугацаа хэтэрсэн.';
              break;
            default:
              errorMessage += 'Байршлыг гараар оруулна уу эсвэл байршлын зөвшөөрлийг шалгана уу.';
              break;
          }
          
          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Таны хөтөч байршил авах боломжгүй байна. Байршлыг гараар оруулна уу.');
    }
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Simple conversion for demo - in real app, use a proper map library
    const lat = mapPosition.lat + (0.5 - y / rect.height) * 0.1;
    const lng = mapPosition.lng + (x / rect.width - 0.5) * 0.1;
    
    setCoordinates({ lat, lng });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={!useMap ? 'default' : 'outline'}
          onClick={() => setUseMap(false)}
          className="flex-1"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Байршлын нэр оруулах
        </Button>
        <Button
          type="button"
          variant={useMap ? 'default' : 'outline'}
          onClick={() => setUseMap(true)}
          className="flex-1"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Газрын зураг/GPS ашиглах
        </Button>
      </div>

      {!useMap ? (
        <div>
          <Label htmlFor="location">Байршил *</Label>
          <Input
            id="location"
            type="text"
            placeholder="Энэ хаана болсон бэ?"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            Байрны нэр, өрөөний дугаар, эсвэл газрын тодорхойлолт оруулна уу
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="flex-1"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {isLoadingLocation ? 'Байршил авч байна...' : 'Миний одоогийн байршил'}
              </Button>
            </div>

            <div className="relative">
              <Label>Эсвэл газрын зураг дээр дарж байршил сонгоно уу</Label>
              <div
                onClick={handleMapClick}
                className="mt-2 w-full h-64 bg-gradient-to-br from-green-100 via-blue-100 to-green-200 rounded-lg border-2 border-gray-300 cursor-crosshair relative overflow-hidden"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 36px),
                    repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,0.03) 35px, rgba(0,0,0,0.03) 36px)
                  `,
                }}
              >
                {/* Decorative map elements */}
                <div className="absolute top-4 left-4 text-xs bg-white px-2 py-1 rounded shadow">
                  Байршил тэмдэглэхийн тулд дарна уу
                </div>
                
                {/* Center marker showing map position */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
                  <MapPin className="w-8 h-8 text-gray-400" />
                </div>

                {/* Selected location marker */}
                {coordinates && (
                  <div
                    className="absolute animate-bounce"
                    style={{
                      left: `${((coordinates.lng - mapPosition.lng) / 0.1 + 0.5) * 100}%`,
                      top: `${(0.5 - (coordinates.lat - mapPosition.lat) / 0.1) * 100}%`,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    <MapPin className="w-8 h-8 text-red-600 drop-shadow-lg" fill="currentColor" />
                  </div>
                )}
              </div>
              
              {coordinates && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">
                      Байршил: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCoordinates(null);
                      onChange('');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500">
              💡 Зөвлөмж: Хэрэв та байршлын нэрийг мэдэхгүй бол газрын зураг дээр ойролцоо газрыг тэмдэглэнэ үү
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
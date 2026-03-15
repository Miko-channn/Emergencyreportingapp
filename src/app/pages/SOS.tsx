import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useReports } from '../context/ReportsContext';
import { toast } from 'sonner';

export default function SOS() {
  const navigate = useNavigate();
  const { addSOSAlert } = useReports();
  const [isActivated, setIsActivated] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null);

  const HOLD_DURATION = 3000; // 3 seconds

  const handleSOSPress = () => {
    // Simulate getting location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationStr = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setLocation(locationStr);
          activateSOS(locationStr);
        },
        (error) => {
          // If location access is denied, use fallback
          let fallbackLocation = 'Location unavailable';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              fallbackLocation = 'Location unavailable (permission denied)';
              break;
            case error.POSITION_UNAVAILABLE:
              fallbackLocation = 'Location unavailable (position unavailable)';
              break;
            case error.TIMEOUT:
              fallbackLocation = 'Location unavailable (timeout)';
              break;
            default:
              fallbackLocation = 'Location unavailable';
              break;
          }
          
          setLocation(fallbackLocation);
          activateSOS(fallbackLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      const fallbackLocation = 'Location unavailable (geolocation not supported)';
      setLocation(fallbackLocation);
      activateSOS(fallbackLocation);
    }
  };

  const handleMouseDown = () => {
    setIsHolding(true);
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(timer);
        handleSOSPress();
        setIsHolding(false);
        setHoldProgress(0);
      }
    }, 50);
    
    setHoldTimer(timer);
  };

  const handleMouseUp = () => {
    if (holdTimer) {
      clearInterval(holdTimer);
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const activateSOS = (loc: string) => {
    setIsActivated(true);
    addSOSAlert(loc);
    
    // Simulate emergency call
    toast.error('ЯАРАЛТАЙ ДУУДЛАГА ИДЭВХЖЛЭЭ! Яаралтай тусламжид мэдэгдсэн.', {
      duration: 5000,
    });

    // In a real app, this would:
    // 1. Send location to emergency services
    // 2. Call emergency number
    // 3. Notify designated contacts
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Нүүр хуудас руу буцах
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4 text-gray-900">Яаралтай Дуудлага</h1>
          <p className="text-gray-600">Яаралтай тусламж шаардлагатай үед товчийг дарна уу</p>
        </div>

        {!isActivated ? (
          <Card className="border-4 border-red-300">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="mb-8">
                <AlertCircle className="w-16 h-16 text-orange-600" />
              </div>
              
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="relative w-64 h-64 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 mb-6 border-8 border-red-400 overflow-hidden"
                style={{ cursor: 'pointer' }}
              >
                {/* Progress indicator */}
                <div 
                  className="absolute inset-0 bg-red-800 transition-all duration-75"
                  style={{ 
                    clipPath: `inset(${100 - holdProgress}% 0 0 0)`,
                    opacity: isHolding ? 0.7 : 0,
                  }}
                />
                
                <div className="relative z-10 text-center">
                  <Phone className="w-20 h-20 text-white mx-auto mb-4" />
                  <span className="text-white text-3xl block mb-2">SOS</span>
                  {!isHolding && (
                    <span className="text-white text-sm">3 секунд дарна уу</span>
                  )}
                  {isHolding && (
                    <span className="text-white text-sm animate-pulse">Дарж байна...</span>
                  )}
                </div>
              </button>

              <p className="text-sm text-red-600 mb-4 max-w-md text-center">
                ⚠️ Яаралтай дохиолол идэвхжүүлэхийн тулд 3 секунд дарж байна уу
              </p>

              <div className="text-center">
                <p className="text-gray-600 mb-3">
                  Идэвхжүүлсэн үед:
                </p>
                <ul className="text-gray-600 space-y-2 inline-block text-left">
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-600" />
                    Таны байршлыг эрх бүхий байгууллагад илгээнэ
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-red-600" />
                    Яаралтай тусламж руу дуудлага хийнэ
                  </li>
                  <li className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                    Бүртгэлтэй холбоо барих хүмүүст мэдэгдэнэ
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-4 border-green-300 bg-green-50">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Phone className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl mb-4 text-green-900">SOS Идэвхжлээ</h2>
              <p className="text-green-800 mb-6">Яаралтай тусламжид мэдэгдсэн</p>
              
              {location && (
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-1">Таны байршил:</p>
                  <p className="flex items-center justify-center text-gray-900">
                    <MapPin className="w-4 h-4 mr-2 text-red-600" />
                    {location}
                  </p>
                </div>
              )}

              <p className="text-gray-700">Тайван байгаарай. Тусламж ирж байна.</p>
              
              <Button
                onClick={() => navigate('/')}
                className="mt-8"
                variant="outline"
              >
                Нүүр хуудас руу буцах
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
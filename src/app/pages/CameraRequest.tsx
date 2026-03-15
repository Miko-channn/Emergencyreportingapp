import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useReports } from '../context/ReportsContext';
import { toast } from 'sonner';
import { LocationPicker } from '../components/LocationPicker';

export default function CameraRequest() {
  const navigate = useNavigate();
  const { addCameraRequest } = useReports();
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !description) {
      toast.error('Бүх талбаруудыг бөглөнө үү');
      return;
    }

    addCameraRequest({
      location,
      description,
    });

    toast.success('Камер суурилуулах хүсэлт амжилттай илгээгдлээ');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Нүүр хуудас руу буцах
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Камер Суурилуулах Хүсэлт</CardTitle>
            <p className="text-gray-600">Тодорхой байршилд хамгаалалтын камер суурилуулах хүсэлт илгээх</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <LocationPicker value={location} onChange={setLocation} />

              <div>
                <Label htmlFor="description">Асуудлын тайлбар *</Label>
                <Textarea
                  id="description"
                  placeholder="Энэ байршилд camer яагаад шаардлагатай болохыг тайлбарлана уу..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Аюулгүй байдлын асуудал эсвэл тохиолдсон явдлын талаар дэлгэрэнгүй бичнэ үү
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Хүсэлт илгээх
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
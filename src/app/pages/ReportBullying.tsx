import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useReports } from '../context/ReportsContext';
import { toast } from 'sonner';
import { LocationPicker } from '../components/LocationPicker';

export default function ReportBullying() {
  const navigate = useNavigate();
  const { addBullyingReport } = useReports();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [evidence, setEvidence] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !location) {
      toast.error('Шаардлагатай талбаруудыг бөглөнө үү');
      return;
    }

    addBullyingReport({
      name: name || undefined,
      description,
      location,
      evidence: evidence || undefined,
      evidenceUrl: evidence ? URL.createObjectURL(evidence) : undefined,
    });

    toast.success('Мэдээлэл амжилттай илгээгдлээ');
    navigate('/');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidence(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-6">
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
            <CardTitle className="text-3xl">Дээрэлхэх Тухай Мэдээлэх</CardTitle>
            <p className="text-gray-600">Тохиолдсон явдлын дэлгэрэнгүй мэдээлэл илгээх</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Нэр (Заавал биш)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Таны нэр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">Та нэрээ нууцлан илгээж болно</p>
              </div>

              <div>
                <Label htmlFor="description">Тайлбар *</Label>
                <Textarea
                  id="description"
                  placeholder="Юу болсныг тайлбарлана уу..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="mt-1"
                />
              </div>

              <LocationPicker value={location} onChange={setLocation} />

              <div>
                <Label htmlFor="evidence">Нотлох баримт оруулах (Зураг/Видео)</Label>
                <div className="mt-1">
                  <label htmlFor="evidence" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {evidence ? evidence.name : 'Файл сонгоход дарна уу'}
                      </p>
                      <p className="text-xs text-gray-500">Зураг эсвэл видео нотлох баримт</p>
                    </div>
                    <input
                      id="evidence"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Мэдээлэл илгээх
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Link } from 'react-router';
import { AlertCircle, Camera, Phone } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl mb-4 text-gray-900">Аюулгүй Байдлын Төв</h1>
          <p className="text-gray-600">Осол гэмтлийн мэдээлэл болон тусламж хүсэх</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/report-bullying" className="block">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 border-transparent hover:border-red-300">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl mb-2 text-gray-900">Дээрэлхэх Тухай Мэдээлэх</h2>
                <p className="text-gray-600">Осол гэмтлийн мэдээлэл илгээх</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/sos" className="block">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 border-transparent hover:border-orange-300">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-10 h-10 text-orange-600" />
                </div>
                <h2 className="text-2xl mb-2 text-gray-900">Яаралтай Дуудлага</h2>
                <p className="text-gray-600">Шуурхай тусламж авах</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/camera-request" className="block">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full border-2 border-transparent hover:border-blue-300">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl mb-2 text-gray-900">Камер Суурилуулах Хүсэлт</h2>
                <p className="text-gray-600">Камер суурилуулах хүсэлт илгээх</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <Link 
            to="/admin" 
            className="inline-block text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Админ Самбар
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, AlertCircle, Camera, Phone, MapPin, FileText, Image, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useReports, BullyingReport, CameraRequest, SOSAlert } from '../context/ReportsContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const bullyingReports = reports.filter(r => r.type === 'bullying') as BullyingReport[];
  const cameraRequests = reports.filter(r => r.type === 'camera') as CameraRequest[];
  const sosAlerts = reports.filter(r => r.type === 'sos') as SOSAlert[];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('mn-MN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-gray-900">Админ Самбар</h1>
            <p className="text-gray-600">Бүх мэдээлэл болон хүсэлтүүдийг хянах, удирдах</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Нүүр хуудас руу буцах
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Дээрэлхэлтийн мэдээлэл</p>
                  <p className="text-3xl">{bullyingReports.length}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Камерын хүсэлт</p>
                  <p className="text-3xl">{cameraRequests.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Яаралтай дуудлага</p>
                  <p className="text-3xl">{sosAlerts.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Бүх мэдээлэл</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Бүгд ({reports.length})</TabsTrigger>
                <TabsTrigger value="bullying">Дээрэлхэлт ({bullyingReports.length})</TabsTrigger>
                <TabsTrigger value="camera">Камер ({cameraRequests.length})</TabsTrigger>
                <TabsTrigger value="sos">SOS ({sosAlerts.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {reports.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Одоогоор мэдээлэл байхгүй байна</p>
                ) : (
                  reports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant={
                                report.type === 'sos' ? 'destructive' :
                                report.type === 'bullying' ? 'default' : 'secondary'
                              }>
                                {report.type === 'bullying' && <AlertCircle className="w-3 h-3 mr-1" />}
                                {report.type === 'camera' && <Camera className="w-3 h-3 mr-1" />}
                                {report.type === 'sos' && <Phone className="w-3 h-3 mr-1" />}
                                {report.type === 'bullying' ? 'ДЭЭРЭЛХЭЛТ' : report.type === 'camera' ? 'КАМЕР' : 'SOS'}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(report.timestamp)}
                              </span>
                            </div>
                            
                            <div className="space-y-1">
                              {report.type === 'bullying' && (
                                <>
                                  {report.name && (
                                    <p className="text-sm"><strong>Мэдээлсэн:</strong> {report.name}</p>
                                  )}
                                  <p className="text-sm"><strong>Тайлбар:</strong> {report.description}</p>
                                </>
                              )}
                              {report.type === 'camera' && (
                                <p className="text-sm"><strong>Тайлбар:</strong> {report.description}</p>
                              )}
                              <p className="text-sm flex items-center">
                                <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                                <strong className="mr-1">Байршил:</strong> {report.location}
                              </p>
                              {report.type === 'bullying' && report.evidenceUrl && (
                                <p className="text-sm flex items-center text-blue-600">
                                  <Image className="w-3 h-3 mr-1" />
                                  Нотлох баримт хавсаргасан
                                </p>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {selectedReport === report.id && report.type === 'bullying' && report.evidenceUrl && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm mb-2">Нотлох баримт:</p>
                            <img 
                              src={report.evidenceUrl} 
                              alt="Нотлох баримт" 
                              className="max-w-md rounded-lg border"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="bullying" className="space-y-4 mt-6">
                {bullyingReports.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Дээрэлхэлтийн мэдээлэл байхгүй</p>
                ) : (
                  bullyingReports.map((report) => (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                ДЭЭРЭЛХЭЛТ
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(report.timestamp)}
                              </span>
                            </div>
                            <div className="space-y-1">
                              {report.name && (
                                <p className="text-sm"><strong>Мэдээлсэн:</strong> {report.name}</p>
                              )}
                              <p className="text-sm"><strong>Тайлбар:</strong> {report.description}</p>
                              <p className="text-sm flex items-center">
                                <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                                <strong className="mr-1">Байршил:</strong> {report.location}
                              </p>
                              {report.evidenceUrl && (
                                <p className="text-sm flex items-center text-blue-600">
                                  <Image className="w-3 h-3 mr-1" />
                                  Нотлох баримт хавсаргасан
                                </p>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                        {selectedReport === report.id && report.evidenceUrl && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm mb-2">Нотлох баримт:</p>
                            <img 
                              src={report.evidenceUrl} 
                              alt="Нотлох баримт" 
                              className="max-w-md rounded-lg border"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="camera" className="space-y-4 mt-6">
                {cameraRequests.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Камерын хүсэлт байхгүй</p>
                ) : (
                  cameraRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            <Camera className="w-3 h-3 mr-1" />
                            КАМЕР
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(request.timestamp)}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm"><strong>Тайлбар:</strong> {request.description}</p>
                          <p className="text-sm flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                            <strong className="mr-1">Байршил:</strong> {request.location}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="sos" className="space-y-4 mt-6">
                {sosAlerts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">SOS дуудлага байхгүй</p>
                ) : (
                  sosAlerts.map((alert) => (
                    <Card key={alert.id} className="hover:shadow-md transition-shadow border-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive">
                            <Phone className="w-3 h-3 mr-1" />
                            ЯАРАЛТАЙ ДУУДЛАГА
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(alert.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-red-500" />
                          <strong className="mr-1">Байршил:</strong> {alert.location}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Явдлын газрын зураг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Бүх явдлын байршлын дүрслэл</p>
                <p className="text-sm mt-1">({reports.length} байршил харуулах)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
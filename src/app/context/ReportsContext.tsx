import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BullyingReport {
  id: string;
  name?: string;
  description: string;
  location: string;
  evidence?: File;
  evidenceUrl?: string;
  timestamp: Date;
  type: 'bullying';
}

export interface CameraRequest {
  id: string;
  location: string;
  description: string;
  timestamp: Date;
  type: 'camera';
}

export interface SOSAlert {
  id: string;
  location: string;
  timestamp: Date;
  type: 'sos';
}

export type Report = BullyingReport | CameraRequest | SOSAlert;

interface ReportsContextType {
  reports: Report[];
  addBullyingReport: (report: Omit<BullyingReport, 'id' | 'timestamp' | 'type'>) => void;
  addCameraRequest: (request: Omit<CameraRequest, 'id' | 'timestamp' | 'type'>) => void;
  addSOSAlert: (location: string) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  const addBullyingReport = (report: Omit<BullyingReport, 'id' | 'timestamp' | 'type'>) => {
    const newReport: BullyingReport = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type: 'bullying',
    };
    setReports(prev => [newReport, ...prev]);
  };

  const addCameraRequest = (request: Omit<CameraRequest, 'id' | 'timestamp' | 'type'>) => {
    const newRequest: CameraRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      type: 'camera',
    };
    setReports(prev => [newRequest, ...prev]);
  };

  const addSOSAlert = (location: string) => {
    const newAlert: SOSAlert = {
      id: Math.random().toString(36).substr(2, 9),
      location,
      timestamp: new Date(),
      type: 'sos',
    };
    setReports(prev => [newAlert, ...prev]);
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        addBullyingReport,
        addCameraRequest,
        addSOSAlert,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}

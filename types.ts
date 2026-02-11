
export type UserRole = 'CEO' | 'ADMIN' | 'FACULTY' | 'STUDENT' | 'EXTERNAL';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  status: 'AVAILABLE' | 'BORROWED' | 'RESERVED' | 'MAINTENANCE' | 'VAULTED';
  year: number;
  location: string;
  securityLevel: 1 | 2 | 3 | 4 | 5; // 5 is highest
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  borrowedCount: number;
  trustScore: number; // 0-100
  avatar?: string;
  status: 'ACTIVE' | 'ABSENT' | 'MEDICAL_LEAVE' | 'RESTRICTED';
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT' | 'PATIENT';
  notes?: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  action: string;
  subject: string;
  status: 'VERIFIED' | 'FLAGGED' | 'DENIED';
  confidence: number;
}

export interface Seat {
  id: string;
  number: string;
  zone: 'SILENT' | 'COLLABORATIVE' | 'TECH_HUB' | 'ARCHIVAL';
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';
  currentUser?: string;
  powerOutlet: boolean;
  isAC: boolean;
}

export interface SecurityAlert {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  timestamp: string;
  fixed: boolean;
}

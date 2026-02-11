
import { Book, Member, SecurityLog, Seat, SecurityAlert, AttendanceRecord } from './types';

export const MOCK_BOOKS: Book[] = [
  { id: 'BK-001', title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-0553380163', genre: 'Science', status: 'AVAILABLE', year: 1988, location: 'Shelf S-12', securityLevel: 1 },
  { id: 'BK-002', title: 'Brave New World', author: 'Aldous Huxley', isbn: '978-0060850524', genre: 'Dystopian', status: 'BORROWED', year: 1932, location: 'Shelf D-04', securityLevel: 2 },
  { id: 'BK-003', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', genre: 'Technology', status: 'AVAILABLE', year: 2008, location: 'Shelf T-01', securityLevel: 1 },
  { id: 'BK-004', title: 'The Voynich Manuscript (Original)', author: 'Unknown', isbn: 'RESTRICTED', genre: 'Occult', status: 'VAULTED', year: 1400, location: 'Vault-Alpha', securityLevel: 5 },
  { id: 'BK-005', title: 'Foundation', author: 'Isaac Asimov', isbn: '978-0553293357', genre: 'Sci-Fi', status: 'RESERVED', year: 1951, location: 'Shelf S-09', securityLevel: 2 },
  { id: 'BK-006', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', genre: 'Classic', status: 'AVAILABLE', year: 1925, location: 'Shelf C-02', securityLevel: 1 },
];

export const MOCK_MEMBERS: Member[] = [
  { id: 'MB-000', name: 'Master Archivist', email: 'ceo@parlibrary.ai', role: 'CEO', joinedDate: '2010-01-01', borrowedCount: 0, trustScore: 100, status: 'ACTIVE' },
  { id: 'MB-101', name: 'Dr. Julian Thorne', email: 'j.thorne@univ.edu', role: 'FACULTY', joinedDate: '2020-05-12', borrowedCount: 42, trustScore: 98, status: 'ACTIVE' },
  { id: 'MB-102', name: 'Sarah Jenkins', email: 'sarah.j@student.edu', role: 'STUDENT', joinedDate: '2023-01-15', borrowedCount: 12, trustScore: 85, status: 'ACTIVE' },
  { id: 'MB-103', name: 'Marcus Aurelius', email: 'marcus@legacy.org', role: 'EXTERNAL', joinedDate: '2019-11-20', borrowedCount: 89, trustScore: 92, status: 'ABSENT' },
  { id: 'MB-104', name: 'Elena Vance', email: 'elena.v@research.org', role: 'STUDENT', joinedDate: '2023-06-10', borrowedCount: 5, trustScore: 80, status: 'MEDICAL_LEAVE' },
  { id: 'MB-999', name: 'Admin Sentinel', email: 'admin@parlibrary.ai', role: 'ADMIN', joinedDate: '2024-01-01', borrowedCount: 0, trustScore: 100, status: 'ACTIVE' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-001', memberId: 'MB-101', date: '2024-05-20', checkIn: '08:45', checkOut: '17:30', status: 'PRESENT' },
  { id: 'ATT-002', memberId: 'MB-102', date: '2024-05-20', checkIn: '09:15', checkOut: '16:00', status: 'PRESENT' },
  { id: 'ATT-003', memberId: 'MB-104', date: '2024-05-20', checkIn: '00:00', status: 'PATIENT', notes: 'Hospitalized - Clinical Wing B' },
];

export const MOCK_SECURITY_LOGS: SecurityLog[] = [
  { id: 'LOG-001', timestamp: new Date().toISOString(), action: 'Biometric Verification', subject: 'Dr. Thorne', status: 'VERIFIED', confidence: 99.8 },
  { id: 'LOG-002', timestamp: new Date().toISOString(), action: 'Vault-Alpha Attempt', subject: 'Unknown', status: 'DENIED', confidence: 84.2 },
  { id: 'LOG-003', timestamp: new Date().toISOString(), action: 'RFID Sync', subject: 'Main Gate', status: 'VERIFIED', confidence: 100.0 },
];

export const MOCK_SEATS: Seat[] = [
  { id: 'ST-01', number: 'A1', zone: 'SILENT', status: 'AVAILABLE', powerOutlet: true, isAC: true },
  { id: 'ST-02', number: 'A2', zone: 'SILENT', status: 'OCCUPIED', currentUser: 'MB-102', powerOutlet: true, isAC: true },
  { id: 'ST-03', number: 'B1', zone: 'TECH_HUB', status: 'RESERVED', powerOutlet: true, isAC: false },
  { id: 'ST-04', number: 'C1', zone: 'COLLABORATIVE', status: 'AVAILABLE', powerOutlet: false, isAC: false },
  { id: 'ST-05', number: 'V1', zone: 'ARCHIVAL', status: 'OCCUPIED', currentUser: 'MB-101', powerOutlet: true, isAC: true },
  { id: 'ST-06', number: 'A3', zone: 'SILENT', status: 'MAINTENANCE', powerOutlet: true, isAC: true },
  { id: 'ST-07', number: 'B2', zone: 'TECH_HUB', status: 'AVAILABLE', powerOutlet: true, isAC: false },
  { id: 'ST-08', number: 'C2', zone: 'COLLABORATIVE', status: 'AVAILABLE', powerOutlet: true, isAC: true },
];

export const MOCK_ALERTS: SecurityAlert[] = [
  { id: 'AL-01', level: 'CRITICAL', message: 'Unauthorized entry attempt at Vault-Alpha. Lockdown protocols standby.', timestamp: '14:22:10', fixed: true },
  { id: 'AL-02', level: 'WARNING', message: 'RFID interference detected in Wing C. Maintenance required.', timestamp: '15:10:05', fixed: false },
  { id: 'AL-03', level: 'INFO', message: 'Network synchronization with Archival Node A-01 completed.', timestamp: '16:00:00', fixed: false },
];

export const CEO_ANALYTICS = {
  revenue: 1250400,
  operatingCosts: 450200,
  acquisitionBudget: 2000000,
  staffCount: 48,
  networkLoad: '34%',
  securityGrade: 'S+'
};

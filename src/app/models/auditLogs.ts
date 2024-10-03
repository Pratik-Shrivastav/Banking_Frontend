export interface AuditLog {
    id: number;
    action: string;
    timestamp: Date;
    details: string;
  }
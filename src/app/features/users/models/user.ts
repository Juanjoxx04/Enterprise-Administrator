export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
    status: 'ACTIVE' | 'INACTIVE';
    createdAt: Date;
}

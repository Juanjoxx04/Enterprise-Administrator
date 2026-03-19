export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR' | 'VIEWER';
    status: 'ACTIVO' | 'INACTIVO';
    createdAt: Date;
}

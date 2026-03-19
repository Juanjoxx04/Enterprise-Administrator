import { User } from '../models/user';

export const USERS_MOCK: User[] = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        role: 'ADMIN',
        status: 'ACTIVO',
        createdAt: new Date('2024-01-10')
    },
    {
        id: '2',
        name: 'María Gómez',
        email: 'maria.gomez@example.com',
        role: 'EDITOR',
        status: 'ACTIVO',
        createdAt: new Date('2024-01-12')
    },
    {
        id: '3',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@example.com',
        role: 'VIEWER',
        status: 'INACTIVO',
        createdAt: new Date('2024-01-15')
    },
    {
        id: '4',
        name: 'Laura Martínez',
        email: 'laura.martinez@example.com',
        role: 'EDITOR',
        status: 'ACTIVO',
        createdAt: new Date('2024-01-18')
    },
    {
        id: '5',
        name: 'Andrés Castillo',
        email: 'andres.castillo@example.com',
        role: 'VIEWER',
        status: 'ACTIVO',
        createdAt: new Date('2024-01-22')
    },
    {
        id: '6',
        name: 'Sofía Ramírez',
        email: 'sofia.ramirez@example.com',
        role: 'ADMIN',
        status: 'ACTIVO',
        createdAt: new Date('2024-02-01')
    },
    {
        id: '7',
        name: 'Daniel Torres',
        email: 'daniel.torres@example.com',
        role: 'EDITOR',
        status: 'INACTIVO',
        createdAt: new Date('2024-02-05')
    },
    {
        id: '8',
        name: 'Camila Herrera',
        email: 'camila.herrera@example.com',
        role: 'VIEWER',
        status: 'ACTIVO',
        createdAt: new Date('2024-02-08')
    },
    {
        id: '9',
        name: 'Felipe Vargas',
        email: 'felipe.vargas@example.com',
        role: 'EDITOR',
        status: 'ACTIVO',
        createdAt: new Date('2024-02-15')
    },
    {
        id: '10',
        name: 'Natalia Moreno',
        email: 'natalia.moreno@example.com',
        role: 'VIEWER',
        status: 'ACTIVO',
        createdAt: new Date('2024-02-20')
    }
];
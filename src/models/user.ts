export interface User {
    id: number;
    email: string;
    address: string;
    city: string;
    firstName: string;
    lastName: string;
    state: string;
    type: string;
    zip: number;
}

export interface UserUpdateRequest {
    id: number;
    email: string;
    address: string;
    city: string;
    firstName: string;
    lastName: string;
    state: string;
    zip: number;
}
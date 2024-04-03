import { Role } from "./role";

export class User {
    id!: number;
    firstname!: string;
    lastname!: string;
    picture!: string;
    email!: string;
    password!: string;
    role!: Role;
    verified!: boolean;
    active!: boolean;
}

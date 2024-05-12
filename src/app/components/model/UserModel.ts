
export class UserModel{
    id?:string;
    username?:string;
    email?:string;
    firstName?:string;
    lastName?:string;
    password?:string;
    roles?:string[];
	credential?:string[];
    attributes?:any;
	enabled?: boolean;
}
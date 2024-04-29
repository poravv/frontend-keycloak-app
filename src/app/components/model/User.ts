export interface ApiResponse<T>{
    message?:string;
    data?:T;
}

export interface IUser{
    id?:string;
    username:string;
    email:string;
    firstName:string;
    lastName:string;
    password:string;
    roles:string[];
}


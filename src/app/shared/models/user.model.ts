

export interface User {
    userId : string ;
    fullName :string; 
    userName: string;
    password:string;
    phone:string;
    address:string;
    email:string;
    joinDate:string
    type:User_Types;
    token:string
}

export type User_Types = "admin" | "client";

export const User_Types = {
    admin: "admin" as User_Types,
    client: "client" as User_Types,
};
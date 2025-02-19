import {IHair} from "@/app/models/user/IHair";
import {IAddress} from "@/app/models/user/IAddress";
import {IBank} from "@/app/models/user/IBank";
import {ICompany} from "@/app/models/user/ICompany";
import {ICrypto} from "@/app/models/user/ICrypto";

export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: IHair[];
    ip: string;
    address: IAddress[];
    macAddress: string;
    university: string;
    bank: IBank[];
    company: ICompany[];
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: ICrypto[];
    role: string;
}
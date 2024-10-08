import { user_role } from "./facility.constant";

export type TFacility = {
    name: string;
    description: string;
    pricePerHour: number;
    location: string,
    isDeleted: boolean,
    image?: string
}


export type TUserRole = keyof typeof user_role
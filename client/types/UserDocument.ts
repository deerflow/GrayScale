import PostDocument from "./PostDocument";

export default interface UserDocument {
    posts?: string[] | PostDocument[];
    _id: string;
    email: string;
    username: string;
    hash: string;
    stayAnonymous: boolean;
    __v?: number;
}
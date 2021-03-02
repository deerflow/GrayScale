import UserDocument from "./UserDocument";

export default interface PostDocument {
    user?: UserDocument;
    _id: string;
    body: string;
    date: string;
    public: boolean;
    __v?: number;
}
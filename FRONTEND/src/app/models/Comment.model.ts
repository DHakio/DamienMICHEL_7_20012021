import { User } from "./User.model";

export class Comment {
    id: number;
    content: string;
    UserId: number;
    PostId: number;
    createdAt: Date;
    updatedAt: Date;
    User: User;
}
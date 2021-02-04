import { User } from "./User.model";
import { Comment } from "./Comment.model";

export class Post {
    id: number;
    title: string;
    content: string;
    UserId: number;
    createdAt: Date;
    updatedAt: Date;
    Comments: Comment[];
    User: User;
}
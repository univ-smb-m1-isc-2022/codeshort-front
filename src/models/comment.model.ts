import { Vote } from "./vote.model";

export class Comment {
    id!: number;
    content !: string;
    author !: string;
    upvotes!: number;
    downvotes!: number;
    vote !: Vote;
}
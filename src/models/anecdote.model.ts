import { Vote } from "./vote.model";

export class Anecdote {
    id!: number;
    topics!: string[];
    description!: string;
    upvotes!: number;
    downvotes!: number;
    starred!: boolean;
    owner!: string;
    vote !: Vote;
    pictureUri !: string;
}
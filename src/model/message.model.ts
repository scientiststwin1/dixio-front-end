import { User } from "./user.model";

export type Message = {
    id: number,
    message_content: string,
    user: User,
}
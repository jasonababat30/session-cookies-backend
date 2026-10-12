import "express-session";
import { User } from "@/utils/types";

declare module 'express-session' {
    interface SessionData {
        user?: Omit<User, 'username' | 'password'>;
    }
}

import { NextFunction, Request, Response } from "express"
import { auth as betterAuth } from "../lib/auth"
export enum UserRoles {
    user = "user",
    admin = "admin"
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string
            }
        }
    }
}


const auth = (...roles: UserRoles[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }



            req.user = {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role as string
            }

            if (roles.length && !roles.includes(req.user.role as UserRoles)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden. You don't have permission to access this resource."
                })
            }

            next();

        } catch (error) {
            next(error);
        }
    }
}

export default auth;
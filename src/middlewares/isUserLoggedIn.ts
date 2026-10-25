import { Request, Response, NextFunction } from 'express';

const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        res
            .status(401)
            .send({
                message: "Unauthorized"
            })
        return;
    }
    next();
}

export default isUserLoggedIn;

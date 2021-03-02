import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, RequestHandler, Response } from "express";
import {User} from "../models/User";

const verifyJWT: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.userId && req.body?.token) {
        const decodedToken = jwt.verify(req.body.token, 'THIS_IS_SECRET');
        if (req.body.userId === decodedToken.userId) {
            const user = await User.findById(req.body.userId);
            if (user) return next();
        }
    }
    return res.status(401).json({ error: 'Unidentified request' });
}

export default verifyJWT;
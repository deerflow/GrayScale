import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Request, RequestHandler, Response } from "express";
import { User, UserInterface } from "../models/User";
import { emailValidation } from "../validations";

export default class UserController {

    static generateJWT(userId): string {
        return jwt.sign(
            { userId: userId },
            'THIS_IS_SECRET',
            { expiresIn: '72h' }
        )
    }

    static async handleRegister(req: Request, res: Response) {
        if (!req.body?.email || !req.body?.password || !req.body?.passwordConfirmation)
            return res.status(400).json({ error: 'Not enough informations provided' });

        if (!emailValidation(req.body.email)) return res.status(400).json({ error: 'Invalid email' });
        if (req.body.password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
        if (req.body.password !== req.body.passwordConfirmation) return res.status(400).json({ error: 'Passwords don\'t match' });

        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await new User({
            email: req.body.email,
            hash: hash,
            stayAnonymous: true
        }).save();

        const id = user._id;
        const token = UserController.generateJWT(id);

        res.status(201)
            .json({
                message: `User successfully created`,
                id: id,
                token: token
            });
    }

    static async handleLogin(req: Request, res: Response) {
        if (!req.body?.email || !req.body?.password)
            return res.status(400).json({ error: 'Not enough informations provided' });

        const emailRule = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        if (!emailRule.test(req.body.email)) return res.status(400).json({ error: 'Invalid email' });

        //To be fixed (any type)
        const user: any = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ error: 'Invalid email or password' });

        if (await bcrypt.compare(req.body.password, user.hash)) {
            const id = user._id;
            const token = UserController.generateJWT(id);

            return res.status(200).json({
                message: 'Login successful',
                id: id,
                token: token,
            })
        }
        return res.status(404).json({ error: 'Invalid email or password' });
    }

    static async getUserInfos(req: Request, res: Response) {
        try {
            const user: any = await User.findById(req.body.userId).select(['email', 'username', 'stayAnonymous']);
            res.status(200).json(user);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }

    static async updateUserInfos(req: Request, res: Response) {
        if (!req.body?.email || !req.body?.username || !req.body.hasOwnProperty('stayAnonymous')) return res.status(400).json({ error: 'Missing requirements' });
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, { email: req.body.email, username: req.body.username, stayAnonymous: req.body.stayAnonymous });
            return res.status(200).json(user);
        } catch (e) {
            res.status(404).json({ error: e });
        }
    }
}
import { Request, Response } from "express";
import Post from "../models/Post";

export default class PostController {
    private static PAGINATION: number = 20;

    static async getLatestPosts(req: Request, res: Response) {
        const posts: any = await Post.find({
            $or: [
                { public: true },
                { public: false, user: req.body.userId }
                ]})
            .sort({ date: -1 })
            .limit(PostController.PAGINATION)
            .populate('user');

        /*const anonymePosts = posts.map(post => {
            if (post.user.stayAnonymous) {
                post.user.username = 'Anonymous';
            }
            post.user.email = '';
            post.user.hash = '';
            return post;
        })*/

        res.status(200).json(posts);
    }

    static async createPost(req: Request, res: Response) {
        if (!req.body?.postBody || !req.body.hasOwnProperty('public')) return res.status(400).json({ error: 'Missing requirements' });

        const post = await Post.create({
            body: req.body.postBody,
            user: req.body.userId,
            date: new Date,
            public: req.body.public
        })

        const populatedPost = await post.populate('user').execPopulate();

        res.status(201).json(populatedPost);
    }

    static async deletePost(req: Request, res: Response) {
        if (!req.body?.postId) return res.status(400).json({error: 'Missing requirements'});

        const postId = req.body.postId;

        const post: any = await Post.findById(postId);

        if (post.user.toString() !== req.body.userId || !post) return res.status(401).json({error: 'Unauthorized'});

        Post.findByIdAndDelete(postId)
            .then(() => res.status(200).json({ id: postId }))
            .catch(e => res.status(500).json({ error: e }));
    }
}
import { Router } from 'express';
import PostController from "../controllers/PostController";
import UserController from "../controllers/UserController";

const auth = Router();

auth.post('/posts', PostController.getLatestPosts);
auth.post('/posts/create', PostController.createPost);
auth.delete('/posts/delete', PostController.deletePost);

auth.post('/users/account', UserController.getUserInfos);
auth.put('/users/account/update', UserController.updateUserInfos);

export default auth;
import * as express from 'express';
import UserController from '../controllers/UserController';

const api = express.Router();

api.use((req, res, next) => {
    console.log(req.body);
    next();
})

api.post('/register', UserController.handleRegister);
api.post('/login', UserController.handleLogin);

export default api;
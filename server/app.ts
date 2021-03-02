import * as express from 'express';

import { Request, Response } from 'express';

import api from "./routes/api";
import auth from "./routes/auth";

import verifyJWT from "./middlewares/verifyJWT";

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/api', api);
app.use('/auth', verifyJWT, auth);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/public/index.html');
});

export default app;
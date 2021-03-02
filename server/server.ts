import * as http from 'http';
import * as mongoose from 'mongoose';
import { PORT, DB_CONNECTION } from '../env';

import app from './app';

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log(`Error : ${e}`));

const server = http.createServer(app);

server.listen(PORT || 3000, () => {
    console.log('Server running on port 3000');
});
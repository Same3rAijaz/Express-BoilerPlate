import express, { Request, Response } from 'express';
import cors from 'cors';
import config from '../config';
import database from './database';
import Routes from './routes/index.routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


app.use('/api', new Routes().router);

app.listen(config.port, () => {
    console.log(`Server started on port:${config.port}`);
    database().then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log(err?.message);
    });
})
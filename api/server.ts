import { Elysia, t } from 'elysia';
import Greeting from './greeting';

const app = new Elysia()
    .get('/greeting', () => Greeting())
    .listen(3000, () => console.log('Listening on port 3000'));
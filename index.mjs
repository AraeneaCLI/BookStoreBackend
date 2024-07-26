import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import { config } from 'dotenv';
import { getUsers, insertUser, insertBook } from './queries.mjs';

config();

const app = express();
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/insertData', insertUser);

app.post('/insertBook', insertBook);

app.get('/users', getUsers);

app.get('/', (req, res) => {
    res.send('Book Store Backend using Node.js, Express.js and PostgreSQL');
});

// Route to check database connection
app.get('/checkConnection', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        const connectionDetails = {
            user: process.env.PG_USER,
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            port: process.env.PG_PORT,
            time: result.rows[0].now,
        };
        client.release();
        res.status(200).json({ status: 'success', connectionDetails });
    } catch (err) {
        console.error('Database connection error', err.stack);
        res.status(500).json({ status: 'error', message: 'Database connection error' });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

export { pool };

import { pool } from "../db/connection.mjs";

const checkConnection = async (req, res) => {
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
};

export{checkConnection};
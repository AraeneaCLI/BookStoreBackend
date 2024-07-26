import { pool } from './index.mjs';

const getUsers = (req, res) => {
    pool.query('SELECT * FROM Users ORDER BY id ASC', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

const insertUser = (req, res) => {
    const { fname, lname, email, password } = req.body;

    console.log(req.body);

    pool.query(
        'INSERT INTO Users (fname, lname, email, password) VALUES ($1, $2, $3, $4)',
        [fname, lname, email, password],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json(result.rows[0]);
        }
    );
};

const insertBook = (req, res) => {
    const { title, subtitle, author, description, image, userId } = req.body;

    console.log(req.body);

    pool.query(
        'INSERT INTO books (title, subtitle, author, description, image, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [title, subtitle, author, description, image, userId],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(201).json(result.rows[0]);
        }
    );
};


export { getUsers, insertUser, insertBook };

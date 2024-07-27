import { pool } from '../db/connection.mjs';

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

const getUsersbyId = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
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

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { fname, lname, email, password } = req.body;

    pool.query(
        'UPDATE Users SET fname = $1, lname = $2, email = $3, password = $4 WHERE id = $5',
        [fname, lname, email, password, id],
        (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.status(200).json(result.rows);
        }
    );
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM Users WHERE id = $1', [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

export { getUsers, insertUser, getUsersbyId, updateUser, deleteUser };

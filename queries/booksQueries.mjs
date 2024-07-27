import { pool } from "../db/connection.mjs";

const insertBook = (req, res) => {
    const { title, subtitle, author, description, image } = req.body;

    console.log(req.body);

    pool.query(
        'INSERT INTO books (title, subtitle, author, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, subtitle, author, description, image],
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

const getBooks = (req, res) => {
    pool.query('SELECT * FROM books ORDER BY id ASC', (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

const getBooksbyId = (req, res) =>{
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM books WHERE id = $1', [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(result.rows);
    });
}


export{ insertBook, getBooks, getBooksbyId};

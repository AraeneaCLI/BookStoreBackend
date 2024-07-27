import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getUsers, insertUser, getUsersbyId, updateUser, deleteUser } from './queries/userQueries.mjs';
import {insertBook, getBooks, getBooksbyId} from './queries/booksQueries.mjs'
import { checkConnection } from './queries/connection.mjs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/insertData', insertUser);
app.get('/getUsers', getUsers);
app.get('/getUsers/:id', getUsersbyId);
app.put('/updateUser/:id', updateUser);
app.delete('/deleteUser/:id', deleteUser);

app.post('/insertBook', insertBook);
app.get('/getBooks', getBooks);
app.get('/getBooks/:id', getBooksbyId);


app.get('/', (req, res) => {
    res.send('Book Store API by AraeneaCLI');
});

app.get('/checkConnection', checkConnection);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});


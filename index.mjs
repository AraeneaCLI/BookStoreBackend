import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Book Store Backend Server by AraeneaCLI');
});

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})
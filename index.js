
// Import any necessary modules and dependencies
const express = require('express');
const app = express();
const PORT = 8080;

// Create a new instance of Express
app.use(express.json())

var distances = [];
var magnets = [];
var magnet = '0';
var distance = '0';

app.get('/sensors/history', (req, res) => {
    res.status(200).send({
        distances: distances,
        magnets: magnets
    })
});

app.get('/sensors/actual', (req, res) => {
    res.status(200).send({
        distance: distance,
        magnet: magnet
    })
});

app.post('/distance/:id', (req, res) =>{
    const {value} = req.body;
    const {id} = req.params;
    if(!value){
        res.status(420).send({message: 'NO VALUE'})
    }

    distance = value;
    distances.push(distance);

    res.status(200).send({
        distance: `distance with value ${value} and id ${id}`
    });
});

app.post('/magnet/:id', (req, res) =>{
    const {value} = req.body;
    const {id} = req.params;
    if(!value){
        res.status(420).send({message: 'NO VALUE'})
    }

    magnet = value;
    magnets.push(magnet);

    res.status(200).send({
        magnet: `magnet with value ${value} and id ${id}`
    });
});

app.listen(
    PORT,
    () => console.log(`ola amigo, I live on http://localhost:${PORT}`)
)

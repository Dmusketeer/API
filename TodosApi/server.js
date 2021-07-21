const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const itemRouter=require('./routes/items')

const port = 3000;
const app = express();

//handlers
app.use(express.json());

app.use('/items',itemRouter);
app.use('/',(req,res)=>{
    res.send("todo api works")
});

const server = http.createServer(app);
server.listen(port);
console.debug('Server listening on port ' + port);
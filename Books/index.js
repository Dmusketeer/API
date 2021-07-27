import express from 'express';

const app = express();
const PORT = 8080;

const books=[
    {"title":"python","id":1},
    {"title":"JavaScript","id":2},
    {"title":"java","id":3},
    {"title":"C++","id":4}
];


app.get('/', (req,res)=>{
    res.send("hello ji");
})

// anthor endpoint
app.get('/books', (req, res) => {
    res.send(books);
})

// dynamic endpoint
app.get('/books/:id', (req, res) => {
    // by default whatever we pass it is in the form of string so we have to convert into integer
    const Book = books.find(val=>val.id===parseInt(req.params.id)); 
    if(!Book) res.status(404).send("book not found")
    res.send(Book);    
})

//post request
app.post('/api', (req, res) => {
    const Book={
        title: req.body.title,
        id:books.length+1
    }
    books.push(Book);
    res.send(Book);
})


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})
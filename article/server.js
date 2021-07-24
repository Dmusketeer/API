
//import all the required dependencies
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
const app = express();

const PORT = 3000; // run server on port number on 3000.

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/person",{
    useNewUrlParser:true
});

//schema
const articleSchema = {
    name: String,
    // title:String
    age: Number,
    gender: String
};

// get request:
app.get('/',(req,res)=>{
    Article.find((err,found)=>{
        if(found){
                // console.log(found)
                res.send(found);
        }else{
            console.log(err);
        }
    })
})

// post request:
app.post('/details',(req,res)=>{
    const Detail = new Article({
        name:req.body.name,
        age: req.body.age,
        gender: req.body.gender
    }); 
    Detail.save();
});

//delete request
app.delete('/details',(req,res)=>{
    Article.deleteOne({ name:"RajniKant"},(err)=>{  //deleting besed on certain conditions
        !err ? res.send("deleted"): res.send(err);
    });
});

// variable inside the route.
// make a specific request using passing the variable
app.get('/articles/:nameOfUser', (req, res) => {
    Article.findOne({ name : req.params.nameOfUser},(err,nameFound)=>{
        if(err){
            console.log(err);
        }else{
            res.send(nameFound);
        }
    })
})


// PUT request 
app.put('/articles/:nameOfuser',(req,res)=>{
    Article.update(
        { name: req.params.nameOfuser},
        {name:req.body.NAME,age : req.body.AGE,gender:req.body.GENDER },
        {overwrite : true}, 
        (err)=>{
            err ? console.log(err): res.send("UpDated");
        })
})



//persons is the collections name.
const Article=mongoose.model("persons",articleSchema);
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})

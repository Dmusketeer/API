
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

//delete a specific values:
//delete request 
app.delete('/details/:userName',(req,res)=>{
    Article.deleteOne({ name:req.params.userName},(err)=>{  //deleting besed on certain conditions
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
});


// PATCH request:
app.patch('/articles/:userNAME', (req, res) => {
    Article.update(
        { name: req.params.userNAME },
        { $set: {age : req.body.AGE}},
        (err) => {
            err ? console.log(err) : res.send("Sucessfull");
        })
});

//persons is the collections name.
const Article=mongoose.model("persons",articleSchema);
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
});

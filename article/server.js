
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
app.get('/',(req,res)=>{
    Article.find((err,found)=>{
        if(found){
                // console.log(found);
                res.send(found);
        }else{
            console.log(err);
        }
    })
})

const articleSchema={
    name:String, 
    // title:String
    age:Number,
    gender:String
};

//items is the collections name.
const Article=mongoose.model("persons",articleSchema);
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})

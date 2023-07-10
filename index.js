const express=require ("express");
const mongoose=require("mongoose");
// const fs = require('fs')
const bodyparse=require("body-parser");
mongoose.connect("mongodb://localhost:27017/geeta",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
console.log("connected");
}).catch((err)=>{
    console.log(err);
})
const app = express();
const PORT=3000;




// app.get("/",(req,res)=>{
//     res.send("<p> hello</p>");
// })


app.get("/",(req,res)=>{
    res.send("<p> hello</p>");
})


// app.get("/list_movies", (req, res) => {
//     fs.readFile(__dirname + '/' + 'movie.json', 'utf8', (err, data) => {
//         res.end(data);
//     });
// });
// app.post("/list_movies", (req, res) => {
//     fs.appendFile(__dirname + '/' + 'movie.json','utf8', (err, data) => {
//         res.end(data);
//     });
// });

const Geetaschema = new mongoose.Schema({
    chapter:{
        type:String,
        required:true,
        unique: true 
    },
    slok: {
         type: String, 
         required: true ,
         unique: true 

        },

    hindi: { 
        type: String, 
        required: true,
        unique: true 


     },
  }
);

app.use(bodyparse.urlencoded({
    extended:true
}))

app.use(express.json())
const geeta=new mongoose.model("geeta",Geetaschema);


// create data
app.post("/api/v1/slok/new",async(req,res)=>{
    const slok= await geeta.create(req.body);
    res.status(201).json({
        success:true,
        message:"slok is added",
        slok,
    })
})

// read data
app.get("/api/v1/sloks",async(req,res)=>{
    const sloks=await geeta.find();
    res.status(201).json({
        success:true,
        sloks,
    })
})

// read one
app.get("/api/v1/slok/:slok_adhyay",async(req,res)=>{
    const slok=await geeta.findById(req.params.slok_adhyay);
    res.status(201).json({
        success:true,
        // message:",
        slok,
    })
})

// delete data
app.delete("/api/v1/slok/:id",async(req,res)=>{
    const slok = await geeta.findById(req.params.id);
//    console.log(slok);
    try{
    if(!slok)
    {
        return res.status(404).json({
             success:false,
             message:"not found",
        });
    }
    await slok.deleteOne({_id:req.params.id});

    res.status(200).json({
        success:true,
        message:"removed",
   });
}catch (error) {
    console.log(error);
}

});
// try {
//     //checking if the user is already exist 

//     const userExist = await userSchema.findOne({ username: req.body.username });

//     if (userExist) return res.status(400).send('UserName Already Exist');
// } catch (error) {
//     console.log(error);
// }

// update data
app.put("/api/v1/slok/:id",async(req,res)=>{
    let slok=await geeta.findById(req.params.id);
    try{
    if(!slok)
    {
        res.status(500).json({
             success:false,
             message:"not found",
        })
    }
    
    slok=await geeta.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:true,
        runValidators:true,
    })
}catch (error) {
    console.log(error);
}
    res.status(200).json({
        success:true,
        message:"update",
        slok,
    })
})
app.listen(PORT ,()=>{
    console.log("ab");
});

const express =require('express')
const mongoose =require('mongoose')
const morgan =require('morgan')
const bodyParser =require('body-parser')
const cors=require('cors')
const {readdirSync} =require('fs')
require('dotenv').config()

//import Routes

//app
const app=express();

//db
mongoose.connect(process.env.DATABASE,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:true})
.then(()=>console.log('db connected'))
.catch((err)=>console.log('DB CONNECTION ERR',err))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors())

//route-middleware
readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)));


//port
const port =process.env.PORT|| 9000

app.listen(port,(()=>{console.log(`server is running on port ${port}`)}))

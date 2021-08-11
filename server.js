const express = require ('express');
const mongoose = require ('mongoose');
const cors = require("cors");
const assert = require('assert');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = Number(process.env.PORT || 5000);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use(cookieParser());

mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false

},err=>{
    if(err) assert.deepStrictEqual(err,null);
    console.log('mongodb connected');
});

    app.use('/api',require('./route/userRouter'));

    app.listen(PORT,()=>{
        console.log(`server is running at http://localhost:${PORT}`)
    });


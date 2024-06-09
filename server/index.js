const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const cookieParser = require('cookie-parser');
const PORT = 8080;
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute')
const productRouter = require('./routes/productsRoute')
const uploadController = require('./controllers/uploadController')
const filterRoute = require('./routes/filterRoute')
const reviewRoute = require('./routes/reviewsRoute')

mongoose.connect('mongodb://127.0.0.1:27017/FYP')
.then(()=>{
    console.log("MongoDB connected!");
})
.catch((err)=>{
    console.log(err);
})

app.use(cors({
    origin: ["http://localhost:3000" ,"http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }))

app.use(cookieParser());  
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use("/static" , express.static(path.join(__dirname, "/public/images")));

app.get('/',(req,res)=>{
    res.send("Working!");
})

app.use('/api/filter/', filterRoute)
app.use('/api/auth/',authRoute);
app.use('/api/user/',userRoute);
app.use('/api/admin/',adminRoute);
app.use('/api/product/',productRouter);
app.use("/api/upload" , uploadController)

app.use('/api/reviews' ,  reviewRoute);


app.listen(PORT,()=>{console.log(`Listening at ${PORT}`)});

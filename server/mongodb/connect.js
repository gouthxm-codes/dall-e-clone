import mongoose from "mongoose";

const connectDB = (url)=>{
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .then(()=>console.log('connected to DB'))
    .catch((err)=>console.log(err.message))
}

export default connectDB
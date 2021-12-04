import * as  express from 'express'
import * as cors from 'cors';
import Logger from '../../../libs/logger'
const app = express()
import * as  mongoose from 'mongoose'
import * as dotenv from "dotenv";

import usersRouter from './app/router/user';
import authRouter  from "./app/router/auth"
import orderRouter from './app/router/order';
import productRouter  from "./app/router/product"
import cartRouter  from "./app/router/cart"

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

dotenv.config();
app.use(cors(options));

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
  .then(()=>{ //Logger.log({message: 'DB WORKS',level: 'info'} )
    console.log("DB CONECTED")
  })
  .catch((err) => { console.log(err) })
  
app.use("/auth",authRouter)
app.use("/api/users", usersRouter)
app.use("/api/order", orderRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)

app.listen(process.env.PORT || 5000, () => {
  
  console.info(`Server is up and running @ http://localhost:${5000}`);

})
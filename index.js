import express from 'express'
import mongoose from 'mongoose'
import urlRoute from './route/url.js'
import {connectToMongoDb} from './connect.js'

const app = express()
const PORT = 8001;

connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('MongoDb connected'))
app.use(express.json())
app.use('/url',urlRoute)
app.listen(PORT , ()=>console.log("server has started!"))

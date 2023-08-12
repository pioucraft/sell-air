import express from 'express';
const app = express()
import cors from "cors"
app.use(cors())
app.use(express.json());

import mongoose from "mongoose"
const mongooseUri = "mongodb://localhost:27017/test"
mongoose.connect(mongooseUri)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    posts: [Number]
});
const User = mongoose.model('User', userSchema);

import {sha256} from 'crypto-hash';

app.all("/api/createUser", async (req, res) => {
    try {
        const username = req.body.username
        const password = await sha256(req.body.password)
        if(await User.findOne({"username": username}) != null) {
            res.send({"error": false, "message": "This username already exists.", "response" : "alreadyUsername"})
        }
        else {
            const user = new User({username: username, password: password})
            user.save()
            res.send({"error": false, "message": "sucess", "response": "sucess"})
        }
        
    }
    catch(err) {
        res.send({"error": true, "message": "You made an error, but we won't tell you what."})
    }
    
})

app.all("/api/doIKnowMyPassword", async (req, res) => {
    try {
        const username = req.body.username
        const password = await sha256(req.body.password)
        const user = await User.findOne({username: username, password: password})
        if(user) {
            res.send({"error": false, "message": "You do know your password.", "response": true})
        }
        else {
            res.send({"error": false, "message": "Hey, you don't know your password", "response": false})
        }
    }
    catch(err) {
        res.send({"error": true, "message": "You made an error, but we won't tell you what."})
    }
})

app.listen(3005)

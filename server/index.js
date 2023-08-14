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
    posts: [String]
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
    username: String,
    place: String,
    time: String,
    airType: String,
    smell: String,
    id: String
});
const Post = mongoose.model('Post', postSchema);

import { v4 as uuidv4 } from 'uuid';
import {sha256} from 'crypto-hash';

app.all("/api/addPost", async (req, res) => {
    try {
        const password = await sha256(req.body.password)
        const dateObject = new Date();
        let date = dateObject.toUTCString();
        const ID = uuidv4() 
        if(await User.findOne({username: req.body.username, password: password})) {
            const post = new Post({username: req.body.username, place: req.body.place, time: date, airType: req.body.airType, smell: req.body.smell, id: ID})
            post.save()
            await User.findOneAndUpdate({username: req.body.username, password: password}, {$push: {posts: ID}})
            res.send({"error": false, "message": "sucesss", "response": "sucess", "id": ID})
        }
        else {
            res.send({"error": true, "message": "Hey, you don't know your password", "response": "badPassword"})
        }
    }
    catch(err) {
        console.log(err)
        res.send({"error": true, "message": "You made an error, but we won't tell you what you did.", "response": "error"})
    }
})

app.all("/api/createUser", async (req, res) => {
    try {
        const username = req.body.username
        const password = await sha256(req.body.password)
        if(await User.findOne({"username": username}) != null) {
            res.send({"error": true, "message": "This username already exists.", "response" : "alreadyUsername"})
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
        res.send({"error": true, "message": "You made an error, but we won't tell you what you did.", "response": "error"})
    }
})

app.all("/api/user/:username", async (req, res) => {
    try {
        const username = req.params.username
        let response = await User.findOne({username: username}, {password: 0, _id: 0, __v: 0})
        res.send({"error": false, "message": "sucess", "response": response})
    }
    catch(err) {
        res.send({"error": true, "message": "You made an error, but we won't tell you what you did.", "response": "error"}) 
    }
})

app.get("/api/post/:postId", async (req, res) => {
    try {
        let response = await Post.findOne({id: req.params.postId}, {_id: 0, __v: 0})
        res.send({"error": false, "message": "sucess", "response": response})
    }
    catch(err) {
        res.send({"error": true, "message": "Something went wrong.", "message": "error"})
    }
})

app.get("/api/search/:query", async (req, res) => {
    try {
        let response = await Post.find({$text:{$search: req.params.query}}) 
        res.send({"error": false, "message": "sucess", "response": response})
    }
    catch(err) {
        res.send({"error": true, "message": "Something went wrong.", "message": "error"})
    }
})

app.listen(3005)

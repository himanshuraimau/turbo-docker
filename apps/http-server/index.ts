import express from "express";
import bodyParser from "body-parser";
import { prismaClient } from "db/client";

const app = express();

// Configure body parsing middleware with explicit options
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));



app.get("/user", (req, res) => {
    prismaClient.user.findMany()
        .then(users => {
            res.json({ users });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
})

app.post("/user", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return
    }

    prismaClient.user.create({
        data: {
            username,
            password
        }
    })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
})

app.listen(3001,
    () => console.log("Server running on http://localhost:3001")
);
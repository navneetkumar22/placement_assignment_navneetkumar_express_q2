//import express and JWT
import express from "express";
import JWT from "jsonwebtoken";
const app = express();

// function to check if user is logged in
const isLoggedIn = async (req, _res, next) => {
    try {
        //find token from cookies
        const token = req.cookies.token;

        if (!token) {
            throw new Error('You are not authorized to access this route')
        }

        //if token is present - verify it
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        next()

    } catch (error) {
        console.log(error);
    }
}


//send post data only to loggedin user- we use above created middleware
app.get('post', isLoggedIn, (_req, res) => {

    const postData = ["This is some post data sent to the endpoint '/post' "];

    res.json({ postData });
})

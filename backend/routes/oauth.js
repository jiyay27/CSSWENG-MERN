const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const { OAuth2Client } = require('google-auth-library');

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    
    const data = await response.json();
    console.log('data', data); 
}

router.get('/', async function(req, res, next) {
    const code = req.query.code;
    try {
        const redirectUrl = 'https://innovasion-enterprise-inv.onrender.com/oauth';
        const oauth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oauth2Client.getToken(code);
        await oauth2Client.setCredentials(res.tokens);

        console.log('Tokens acquired');
    
        const user = oauth2Client.credentials;
        console.log('credentials', user);
        await getUserData(user.access_token);
    } 
    catch (error) {
        console.log('Error withGoogle sign in', error);
    }
});
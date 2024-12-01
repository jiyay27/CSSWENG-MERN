const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const { OAuth2Client } = require('google-auth-library');

router.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'url');
    // res.header('Refferer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'https://innovasion-enterprise-inv.onrender.com/oauth';

    const oauth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: 'online',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'
    });

    res.json({url:authorizeUrl})
});


moduler.exports = router;
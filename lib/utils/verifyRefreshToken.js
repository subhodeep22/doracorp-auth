const UserToken = require("../models/UserToken");
const jwt = require("jsonwebtoken");

module.exports = (refreshToken) => {
    const publicKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }, (err, doc) => {
            if (!doc)
                return reject({ error: true, message: "Invalid refresh token" });

            jwt.verify(refreshToken, publicKey, (err, tokenDetails) => {
                if (err)
                    return reject({ error: true, message: "Invalid refresh token" });
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        });
    });
};
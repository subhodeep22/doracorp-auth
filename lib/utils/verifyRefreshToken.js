const UserToken = require("../repository/UserTokenRepoMongo");
const jwt = require("jsonwebtoken");

module.exports.verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PUBLIC_KEY;

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
            if (err)
                return reject({ error: true, message: "Invalid refresh token" });
            resolve({
                tokenDetails,
                error: false,
                message: "Valid refresh token",
            });
        });
    });
};
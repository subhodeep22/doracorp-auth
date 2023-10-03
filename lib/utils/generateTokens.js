const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken");

module.exports = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };
        const accessToken = jwt.sign(
            payload,
            {key:  process.env.ACCESS_TOKEN_PRIVATE_KEY, passphrase : ''},
            { algorithm: 'RS256',
            allowInsecureKeySizes: true,
            expiresIn: "14m" 
            }
        );
        const refreshToken = jwt.sign(
            payload,
            {key: process.env.REFRESH_TOKEN_PRIVATE_KEY, passphrase: ''},
            { algorithm: 'RS256',
            allowInsecureKeySizes: true,
            expiresIn: "7d" 
            }
        );

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.deleteOne({ userId: user._id })

        await UserToken.create({ userId: user._id, token: refreshToken });
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};
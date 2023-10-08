const jwt = require("jsonwebtoken");

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

        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};
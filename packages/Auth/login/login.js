const validation = require("../../../lib/utils/validateSchema.js");
const User = require("../../../lib/repository/UserRepoPg")
const bcrypt = require("bcrypt");
const generateTokens = require("../../../lib/utils/generateTokens.js");
const pgp = require("pg-promise")()

module.exports.main = async (event,context) => {
    const {payload} = event
    try {
        const { error } = validation.logInBodyValidation(payload.body);
        if (error){
            res = {
                statusCode: 400,
                body:{
                error: true, 
                message: error.details[0].message
                }
            }
            return res
        }
        const user = await User.findOne({ email: payload.email });
        pgp.end()
        if (!user){
            return res = {
                statusCode: 401,
                body:{ 
                message: "Invalid Username/Password Combintation"
                }
            }
        }

        const verifiedPassword = await bcrypt.compare(
            payload.password,
            user.password
        );
        if (!verifiedPassword)
        {
            return res = {
                statusCode: 401,
                body:{ 
                message: "Invalid Username/Password Combintation"
                }
            }
        }

        const { accessToken, refreshToken } = await generateTokens(user);
        
        return res = {
            headers:{
                "Set-Cookie":"jwt="+refreshToken+"; HttpOnly=true; max-age=86400000; SameSite=true; secure=true"
            },
            body:{
                error: false,
                accessToken,
                message: "Logged in sucessfully",
            }
        }
    } catch (err) {
        console.log(err);
        return res = {
            body:{
                error: true,
                message: "Internal Server Error",
            }
        }
    }
}
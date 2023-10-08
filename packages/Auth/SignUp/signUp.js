const validation = require("../../../lib/utils/validateSchema")
const User = require("../../../lib/repository/UserRepoPg");
const bcrypt = require("bcrypt");
const pgp = require("pg-promise")()

module.exports.main =  async (event,context) => {
  const {payload} = event
  try {
    const { error } = validation.signUpBodyValidation(payload);
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
    if (user){
      pgp.end()
      res = {
        statusCode: 400,
        body:{
          error: true, 
          message: "User with given email already exist"
        }
      }
      return res
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(payload.password, salt);

    await User.create({ ...payload, password: hashPassword });
    pgp.end()
    return res = {
      statusCode: 200,
      body:{
        error: false, 
        message: "Account Created successfully"
      }
    }
  } catch (err) {
      console.log("Internal Server Error");
      return res = {
        statusCode: 400,
        body:{
          error: true, 
          message: "Internal Server Error"
        }
      }
  }
}
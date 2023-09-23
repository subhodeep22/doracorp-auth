import {
  signUpBodyValidation
} from "utils/validateSchema.js";
import User from "models/User.js";
import bcrypt from "bcrypt";

module.exports.main =  async (event,context) => {
  try {
    const { error } = signUpBodyValidation(event);
    if (error)
        return res
            .status(400)
            .json({ error: true, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(400)
            .json({ error: true, message: "User with given email already exist" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();

    res
        .status(201)
        .json({ error: false, message: "Account created sucessfully" });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
  }
}
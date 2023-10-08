const db = require("../utils/dbConnect")

module.exports.findOne = async (args)=>{
    try {
        const user = await db.any('SELECT * FROM auth.users WHERE email = $1', [args.email]);
        return user[0]
    } 
    catch(e) {
        throw new Error("Database error!")
    }
}

module.exports.create = async (args)=>{
    try {
        await db.any("INSERT INTO auth.users(name, email, password, role)VALUES ($1, $2, $3, 'user');", [args.name,args.email,args.password]);
    } 
    catch(e) {
        throw new Error("Database error!")
    }
}
const dbConnect = require("../utils/dbConnect")
const UserRepoMongo = require("../repository/UserTokenRepoMongo")

module.exports.findOne =async (args)=>{
    await dbConnect({connect: true})
    user = await UserRepoMongo.findOne(args)
    // await dbConnect({connect: false})
    return user
}

module.exports.deleteOne =async (args)=>{
    await dbConnect({connect: true})
    await UserRepoMongo.deleteOne(args)
    // await dbConnect({connect: false});
}

module.exports.create = async (args)=>{
    await dbConnect({connect: true})
    await new UserRepoMongo(args).save();
    // await dbConnect({connect: false})
}
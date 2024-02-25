import { connectToDB } from "../../../lib/mongodb/mongoose"
import User from "../../../lib/models/User"

export const GET = async (req) => {
    try {
        await connectToDB()
        const allUsers = await User.find()
            .populate("posts savedPosts likedPosts followers following")
            .exec()
        return new Response(JSON.stringify(allUsers), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get all user", { status: 500 })
    }
}

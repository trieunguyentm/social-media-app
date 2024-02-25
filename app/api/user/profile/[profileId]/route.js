import { connectToDB } from "../../../../../lib/mongodb/mongoose"
import User from "../../../../../lib/models/User"
import Post from "../../../../../lib/models/Post"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        // const user = await User.findById(params.profileId)
        //     .populate("posts savedPosts likedPosts followers following")
        //     .exec()
        const user = await User.findById(params.profileId)
            .populate({
                path: "posts savedPosts likedPosts",
                model: Post,
                populate: {
                    path: "creator",
                    model: User,
                },
            })
            .populate({
                path: "followers following",
                model: User,
                populate: {
                    path: "posts savedPosts likedPosts",
                    model: Post,
                },
            })
            .exec()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to get user", { status: 500 })
    }
}

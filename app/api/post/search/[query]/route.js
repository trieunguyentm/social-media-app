import { connectToDB } from "../../../../../lib/mongodb/mongoose"
import Post from "../../../../../lib/models/Post"

export const GET = async (req, { params }) => {
    const { query } = params

    try {
        await connectToDB()

        const searchedPost = await Post.find({
            $or: [
                { caption: { $regex: query, $options: "i" } },
                { tag: { $regex: query, $options: "i" } },
            ],
        })
            .populate("creator likes")
            .exec()

        return new Response(JSON.stringify(searchedPost), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Fail to get search post", { status: 500 })
    }
}

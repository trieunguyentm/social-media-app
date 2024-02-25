import { connectToDB } from "../../../../../../lib/mongodb/mongoose"
import User from "../../../../../../lib/models/User"
import Post from "../../../../../../lib/models/Post"

export const POST = async (req, { params }) => {
    try {
        await connectToDB()
        const userId = params.id
        const postId = params.postId

        const user = await User.findOne({ clerkId: userId }).populate(
            "posts savedPosts likedPosts following followers",
        )

        const post = await Post.findById(postId).populate("creator likes")
        const isLiked = user.likedPosts.find((item) => item._id.toString() === postId)
        if (isLiked) {
            user.likedPosts = user.likedPosts.filter((item) => item._id.toString() !== postId)
            post.likes = post.likes.filter((item) => item._id.toString() !== user._id.toString())
        } else {
            user.likedPosts.push(post)
            post.likes.push(user)
        }
        await user.save()
        await post.save()
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to save/unsave post", { status: 500 })
    }
}

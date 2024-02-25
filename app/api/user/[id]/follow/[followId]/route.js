import { connectToDB } from "../../../../../../lib/mongodb/mongoose"
import User from "../../../../../../lib/models/User"
import Post from "../../../../../../lib/models/Post"

export const POST = async (req, { params }) => {
    try {
        await connectToDB()
        /** Id của người đang trực tuyến (online) */
        const userId = params.id
        /** Id của người mà sẽ follow */
        const followId = params.followId
        /** Find by Id Clerk */
        const user = await User.findOne({ clerkId: userId }).populate(
            "posts savedPosts likedPosts followers following",
        )
        /** Find by Id mongoDB */
        const personToFollow = await User.findById(followId).populate(
            "posts savedPosts likedPosts followers following",
        )
        /** Kiểm tra xem người dùng trực tuyến đã follow người dùng này hay chưa */
        const isFollowing = user?.following.find((item) => item._id.toString() === followId)
        /** Nếu đã following thì khi gọi đến API này sẽ là unfollow */
        if (isFollowing) {
            user.following = user.following.filter((item) => item._id.toString() !== followId)
            personToFollow.followers = personToFollow.followers.filter(
                (item) => item._id.toString() !== user._id.toString(),
            )
        } else {
            /** Nếu chưa follow */
            user.following.push(personToFollow)
            personToFollow.followers.push(user)
        }
        await user.save()
        await personToFollow.save()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to follow/unfollow user", { status: 500 })
    }
}

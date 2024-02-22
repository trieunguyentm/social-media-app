import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    caption: {
        type: String,
        require: true,
    },
    postPhoto: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        require: true,
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)

export default Post

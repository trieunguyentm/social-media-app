import { connectToDB } from "../../../../lib/mongodb/mongoose"
import Post from "../../../../lib/models/Post"
import { writeFile } from "fs/promises"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params.id).populate("creator likes").exec()

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Fail to get post by id", { status: 500 })
    }
}

export const POST = async (req, { params }) => {
    const path = require("path")
    const currentWorkingDirectory = process.cwd()

    try {
        await connectToDB()

        const data = await req.formData()

        let postPhoto = data.get("postPhoto")
        /** Chuyển post Photo về dạng chuỗi */
        if (typeof postPhoto !== "string") {
            const bytes = await postPhoto.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const postPhotoPath = path.join(
                currentWorkingDirectory,
                "public",
                "uploads",
                postPhoto.name,
            )

            await writeFile(postPhotoPath, buffer)

            postPhoto = `/uploads/${postPhoto.name}`
        }

        const post = await Post.findByIdAndUpdate(params.id, {
            $set: {
                caption: data.get("caption"),
                tag: data.get("tag"),
                postPhoto: postPhoto,
            },
        })

        await post.save()

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response("Failed to update a post", { status: 500 })
    }
}

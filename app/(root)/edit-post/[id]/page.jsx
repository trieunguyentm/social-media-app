"use client"

import { useParams } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import React, { useEffect, useState } from "react"
import Loader from "../../../../components/Loader"
import Posting from "../../../../components/form/Posting"
import { useRouter } from "next/navigation"

const EditPost = () => {
    const router = useRouter()
    const { user, isLoaded } = useUser()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState([])

    const getPost = async () => {
        if (user) {
            const response = await fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            console.log(data)
            console.log(user)
            /** Ngăn chặn người khác truy cập edit trái phép */
            if (data?.creator?.clerkId !== user?.id) {
                router.push("/")
            }
            setLoading(false)
            setPostData(data)
        }
    }

    useEffect(() => {
        getPost()
    }, [id, user])

    const postInfo = {
        creatorId: postData?.creator?._id,
        caption: postData?.caption,
        tag: postData?.tag,
        postPhoto: postData?.postPhoto,
    }

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <Posting post={postInfo} apiEndPoint={`/api/post/${id}`} />
    )
}

export default EditPost

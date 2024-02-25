"use client"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import ProfileCard from "../../../../../components/cards/ProfileCard"
import Loader from "../../../../../components/Loader"
import PostCard from "../../../../../components/cards/PostCard"
import { useUser } from "@clerk/nextjs"

const ProfilePosts = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState({})

    const getUser = async (req, res) => {
        /** Tìm kiếm theo Mongo id */
        const response = await fetch(`/api/user/profile/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        // console.log("dataUser:", data)

        setLoading(false)
        setUserData(data)
    }

    useEffect(() => {
        getUser()
    }, [id])

    const { user, isLoaded } = useUser()
    // console.log(userData)

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="flex flex-col gap-9">
            <ProfileCard userData={userData} activeTab={`Posts`} update={getUser} />
            <div className="flex flex-col gap-9">
                {userData?.posts?.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        creator={post.creator}
                        loggedInUser={user}
                        update={getUser}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProfilePosts

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder } from "@mui/icons-material"

const PostCard = ({ post, creator, loggedInUser, update }) => {
    const [userData, setUserData] = useState({})

    const getUser = async () => {
        const response = await fetch(`/api/user/${loggedInUser.id}`)
        const data = await response.json()
        setUserData(data)
    }

    useEffect(() => {
        if (loggedInUser) {
            getUser()
        }
    }, [])

    const isSaved = userData?.savedPosts?.find(
        (item) => item._id.toString() === post._id.toString(),
    )
    const isLiked = userData?.likedPosts?.find(
        (item) => item._id.toString() === post._id.toString(),
    )

    const handleSave = async () => {
        const response = await fetch(`/api/user/${loggedInUser.id}/save/${post._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setUserData(data)
        update()
    }

    const handleLike = async () => {
        const response = await fetch(`/api/user/${loggedInUser.id}/like/${post._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setUserData(data)
        update()
    }

    return (
        <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2 ">
            <div className="flex justify-between">
                <Link href={`profile/${creator._id}/posts`}>
                    <div className="flex gap-3 items-center">
                        <Image
                            src={creator.profilePhoto}
                            alt="profile photo"
                            width={50}
                            height={50}
                            className="rounded-full"
                            style={{ clipPath: "circle()" }}
                        />
                        <div className="flex flex-col gap-1">
                            <p className="text-small-semibold text-light-1">
                                {creator.firstName} {creator.lastName}
                            </p>
                            <p className="text-subtle-medium text-light-3">@{creator.username}</p>
                        </div>
                    </div>
                </Link>
                {loggedInUser.id === creator.clerkId && (
                    <Link href={`/edit-post/${post._id}`}>
                        <BorderColorIcon sx={{ color: "white", cursor: "pointer" }} />
                    </Link>
                )}
            </div>
            <p className="text-body-normal text-light-1 max-sm:text-small-semibold">
                {post.caption}
            </p>
            <Image
                src={post.postPhoto}
                alt="post photo"
                width={200}
                height={150}
                className="rounded-lg w-full"
            />
            <p className="text-base-bold text-purple-1 max-sm:text-small-bold">{post.tag}</p>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    {!isLiked ? (
                        <FavoriteBorder
                            sx={{ color: "white", cursor: "pointer" }}
                            onClick={handleLike}
                        />
                    ) : (
                        <Favorite sx={{ color: "red", cursor: "pointer" }} onClick={handleLike} />
                    )}

                    <p className="text-light-1">{post.likes.length}</p>
                </div>
                {loggedInUser.id !== creator.clerkId &&
                    (!isSaved ? (
                        <BookmarkBorder
                            sx={{ color: "white", cursor: "pointer" }}
                            onClick={handleSave}
                        />
                    ) : (
                        <Bookmark
                            sx={{ color: "yellow", cursor: "pointer" }}
                            onClick={handleSave}
                        />
                    ))}
            </div>
        </div>
    )
}

export default PostCard

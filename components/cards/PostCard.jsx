import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder } from "@mui/icons-material"

const PostCard = ({ post, creator, loggedInUser }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    return (
        <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-dark-1 p-5 max-sm:gap-2 ">
            <div className="flex justify-between">
                <Link href={`profile/${creator._id}`}>
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
                        <FavoriteBorder sx={{ color: "white", cursor: "pointer" }} />
                    ) : (
                        <Favorite sx={{ color: "red", cursor: "pointer" }} />
                    )}

                    <p className="text-light-1">{post.likes.length}</p>
                </div>
                {loggedInUser.id !== creator.clerkId &&
                    (!isSaved ? (
                        <BookmarkBorder sx={{ color: "white", cursor: "pointer" }} />
                    ) : (
                        <Bookmark sx={{ color: "yellow", cursor: "pointer" }} />
                    ))}
            </div>
        </div>
    )
}

export default PostCard

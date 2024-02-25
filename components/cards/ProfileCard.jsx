"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import Loader from "../Loader"
import { PersonAdd, PersonRemove } from "@mui/icons-material"
import { tabs } from "../../constants"

const ProfileCard = ({ userData, activeTab, update }) => {
    /** userData là người mà mình muốn xem profile */
    /** Lấy ra thông tin người dùng (người mà đang  đăng nhập) */
    const { user, isLoaded } = useUser()
    const [loading, setLoading] = useState(true)
    /** Lưu thông tin người dùng trực tuyến */
    const [userInfo, setUserInfo] = useState([])

    const getUser = async () => {
        if (user) {
            /** Fetch thông tin người dùng theo Clerk Id */
            const response = await fetch(`/api/user/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json()
            setUserInfo(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [user])

    const isFollowing = userInfo?.following?.find((item) => item._id === userData._id)

    const handleFollow = async () => {
        const response = await fetch(`/api/user/${user.id}/follow/${userData._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        setUserInfo(data)
        update()
    }

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="flex flex-col gap-9">
            <div className="flex justify-between items-start">
                <div className="flex gap-5 items-start">
                    <Image
                        src={userData.profilePhoto}
                        alt="profile photo"
                        width={100}
                        height={100}
                        className="rounded-full md:max-lg:hidden"
                        style={{ clipPath: "circle()" }}
                    />
                    <div className="flex flex-col gap-3">
                        <p className="text-light-1 text-heading3-bold max-sm:text-heading4-bold">
                            {userData.firstName} {userData.lastName}
                        </p>
                        <p className="text-light-3 text-subtle-medium">@{userData.username}</p>
                        <div className="flex gap-7 text-small-bold max-sm:gap-4">
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1"> {userData.posts.length}</p>
                                <p className="text-light-1">Posts</p>
                            </div>
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1"> {userData.followers.length}</p>
                                <p className="text-light-1">Followers</p>
                            </div>
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1"> {userData.following.length}</p>
                                <p className="text-light-1">Following</p>
                            </div>
                        </div>
                    </div>
                </div>

                {user.id !== userData.clerkId &&
                    (isFollowing ? (
                        <PersonRemove
                            onClick={handleFollow}
                            sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
                        />
                    ) : (
                        <PersonAdd
                            onClick={handleFollow}
                            sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
                        />
                    ))}
            </div>
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <Link
                        key={tab.link}
                        href={`/profile/${userData._id}/${tab.link}`}
                        className={`tab ${activeTab === tab.name ? "bg-purple-1" : "bg-dark-1"}`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProfileCard

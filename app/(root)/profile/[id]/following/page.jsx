"use client"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import ProfileCard from "../../../../../components/cards/ProfileCard"
import Loader from "../../../../../components/Loader"
import UserCard from "../../../../../components/cards/UserCard"

import { useUser } from "@clerk/nextjs"

const ProfileFollowing = () => {
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
            <ProfileCard userData={userData} activeTab={`Following`} update={getUser} />
            <div className="flex flex-col gap-9">
                {userData?.following?.map((person) => (
                    <UserCard key={person._id} userData={person} update={getUser} />
                ))}
            </div>
        </div>
    )
}

export default ProfileFollowing

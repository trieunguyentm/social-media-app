"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Loader from "../../../../../components/Loader"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import UserCard from "../../../../../components/cards/UserCard"

const SearchPeople = () => {
    const { query } = useParams()

    const [loading, setLoading] = useState(true)
    const [searchedUser, setSearchedUser] = useState([])

    const getSearchedUsers = async () => {
        const response = await fetch(`/api/user/search/${query}`)
        const data = await response.json()
        setSearchedUser(data)
        setLoading(false)
    }

    useEffect(() => {
        getSearchedUsers()
    }, [query])

    const { user, isLoaded } = useUser()

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="flex flex-col gap-10">
            <div className="flex gap-6">
                <Link className="tab bg-dark-1" href={`/search/posts/${query}`}>
                    Posts
                </Link>
                <Link className="tab bg-purple-1" href={`/search/people/${query}`}>
                    People
                </Link>
            </div>
            {searchedUser.map((user) => (
                <UserCard key={user._id} userData={user} />
            ))}
        </div>
    )
}

export default SearchPeople

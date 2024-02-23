"use client"

import React, { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import Logout from "@mui/icons-material/Logout"
import { useRouter } from "next/navigation"

const TopBar = () => {
    const router = useRouter()
    const [search, setSearch] = useState("")

    return (
        <div className="flex justify-between items-center mt-6">
            <div className="relative">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search posts, people"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SearchIcon
                    className="search-icon"
                    onClick={() => {
                        if (search) router.push(`/search/posts/${search}`)
                    }}
                />
            </div>
            <button
                className="create-post-btn"
                onClick={() => {
                    router.push("/create-post")
                }}
            >
                <AddIcon />
                <p>Create A Post</p>
            </button>
            <div className="flex gap-3 md:hidden">
                <div className="flex gap-4 items-center">
                    <Logout sx={{ color: "white", fontSize: "32px", cursor: "pointer" }} />
                </div>
                <div className="flex gap-4 items-center">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default TopBar

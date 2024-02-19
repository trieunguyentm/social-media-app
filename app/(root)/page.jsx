import React from "react"
import { UserButton } from "@clerk/nextjs"

const Home = () => {
    return (
        <div className="h-screen">
            <UserButton />
        </div>
    )
}

export default Home

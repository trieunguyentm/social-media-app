import Link from "next/link"
import Image from "next/image"
import React from "react"
import Menu from "./Menu"
import { UserButton } from "@clerk/nextjs"
import { Logout } from "@mui/icons-material"

const LeftSideBar = () => {
    const isLoggedIn = true
    return (
        <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar border-r-2">
            <Link href="/">
                <div className="flex gap-2 justify-center items-center">
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <p className="text-light-1 text-body-bold">Social Media App</p>
                </div>
            </Link>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 items-center text-light-1">
                    <Link href="/">
                        <Image
                            src="/dog.jpg"
                            alt="avatar"
                            width={100}
                            height={100}
                            className="rounded-full"
                            style={{ clipPath: "circle()" }}
                        />
                    </Link>
                    <p className="text-small-bold">Triệu Nguyễn</p>
                </div>
                <div className="flex text-light-1 justify-between gap-3">
                    <div className="flex flex-col items-center">
                        <p className="text-base-bold">1</p>
                        <p className="text-tiny-medium">Post</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-base-bold">1</p>
                        <p className="text-tiny-medium">Followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-base-bold">1</p>
                        <p className="text-tiny-medium">Following</p>
                    </div>
                </div>
                <hr />
                <Menu />
                <hr />
                <div className="flex gap-4 items-center">
                    <UserButton appearance={{ baseTheme: "dark" }} afterSignOutUrl="/sign-in" />
                    <p className="text-light-1 text-body-bold">Manage Account</p>
                </div>
                {/* <div className="flex gap-4 items-center">
                    <Logout sx={{ color: "white", fontSize: "32px", cursor: "pointer" }} />
                    <p className="text-body-bold text-light-1">Log Out</p>
                </div> */}
            </div>
        </div>
    )
}

export default LeftSideBar

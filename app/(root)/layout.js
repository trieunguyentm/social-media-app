import { ClerkProvider } from "@clerk/nextjs"
import "../globals.css"
import { Inter } from "next/font/google"

import LeftSideBar from "../../components/layout/LeftSideBar"
import MainContainer from "../../components/layout/MainContainer"
import RightSideBar from "../../components/layout/RightSideBar"
import BottomBar from "../../components/layout/BottomBar"

export const metadata = {
    title: "Home",
    descriotion: "Generated by trieunguyentm",
}

const inter = Inter({ subsets: ["latin"] })

const RootLayout = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-purple-2`}>
                    <main className="flex flex-row">
                        <LeftSideBar />
                        <MainContainer>
                            {children}
                        </MainContainer>
                        <RightSideBar />
                    </main>
                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    )
}

export default RootLayout
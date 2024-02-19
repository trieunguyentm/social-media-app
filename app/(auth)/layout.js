import { Inter } from "next/font/google"
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs"

export const metadata = {
    title: "Auth",
    descriotion: "Social Media App",
}

const inter = Inter({ subsets: ["latin"] })

const RootLayout = ({ children }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-purple-2`}>{children}</body>
            </html>
        </ClerkProvider>
    )
}

export default RootLayout

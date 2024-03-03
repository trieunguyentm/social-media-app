import { SignUp } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

const Page = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignUp appearance={{ baseTheme: dark }} />
        </div>
    )
}

export default Page

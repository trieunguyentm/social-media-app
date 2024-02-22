import React from "react"

const Loader = () => {
    return (
        <div className="min-w-52">
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-20 w-20"></div>
            </div>
        </div>
    )
}

export default Loader

import React from "react"
import Image from "next/image"

const RightSideBar = () => {
    return (
        <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden text-light-1">
            <div className="flex flex-col gap-4">
                <h3 className="text-heading3-bold">Sponsored</h3>
                <Image
                    src={`/sponsored.jpeg`}
                    width={200}
                    height={200}
                    alt="sponsored"
                    className="rounded-lg w-full"
                />
                <p className="text-body-bold text-light-1">strapi CONF GOLD SPONSOR</p>
                <p className="text-small-semibold text-light-3">
                    We are thrilled to announce that @vercel has joined us as a sponsor for
                    #StrapiConf ! 🎉 Don't miss the opportunity to attend the conference and learn
                    more about Strapi and Vercel.
                </p>
            </div>
        </div>
    )
}

export default RightSideBar

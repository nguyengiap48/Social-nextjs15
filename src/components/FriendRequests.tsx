import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";
import FriendRequestsList from "./FriendRequestsList";

async function FriendRequests() {
    const { userId } = auth()

    if(!userId) {
        return null
    }

    const request = await prisma.followRequest.findMany({
        where: {
            receiverId: userId,
        },
        include: {
            sender: true
        }
    })

    // if(request.length === 0) {
    //     return null
    // }
    return (  
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">Friend Requests</span>
                <Link href={'/'} className="text-blue-500 text-xs hover:underline">See all</Link>
            </div>

            {/* BOTTOM */}
            <FriendRequestsList requests={request}/>
        </div>
    );
}

export default FriendRequests;
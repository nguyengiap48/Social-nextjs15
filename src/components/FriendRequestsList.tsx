"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FcOk } from "react-icons/fc";

type RequestsWithUser = FollowRequest & {
    sender: User;
};
function FriendRequestsList({ requests }: { requests: RequestsWithUser[] }) {
    const [requestsState, setRequestState] = useState(requests);

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (err) {
            console.error("Error accepting follow request:", err);
        }
    };

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (err) {
            console.error("Error accepting follow request:", err);
        }
    };

    const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
        requestsState,
        (state, value: number) => state.filter((req) => req.id !== value)
    );

    return (
        <div className="flex flex-col gap-4 mt-4">
            {optimisticRequest.map((request) => (
                <div className="flex items-center justify-between">
                    {/* USER */}
                    <div className="flex items-center gap-2">
                        <img
                            alt=""
                            className="w-10 h-10 rounded-full"
                            src={request.sender.avatar || ""}
                        />
                        <span className="font-semibold text-md">
                            {request.sender.username}
                        </span>
                    </div>
                    {/* ACTION */}
                    <div className="flex gap-2 items-center">
                        <form action={() => accept(request.id, request.sender.id)}>
                            <button>
                                <FcOk className="w-[18.25px] h-[18.25px] cursor-pointer" />
                            </button>
                        </form>
                        <form action={() => decline(request.id, request.sender.id)}>
                            <button>
                                <FaCircleXmark className="text-gray-400 w-[16px] h-full cursor-pointer" />
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FriendRequestsList;

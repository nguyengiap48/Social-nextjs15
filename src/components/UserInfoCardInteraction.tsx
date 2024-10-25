"use client";
import { switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

function UserInfoCardInteraction({
    userId,
    currentUserId,
    isUserBlocked,
    isFollowing,
    isFollowingSent,
}: {
    userId: string;
    currentUserId: string;
    isUserBlocked: boolean;
    isFollowing: boolean;
    isFollowingSent: boolean;
}) {
    const [userState, setUserState] = useState({
        following: isFollowing,
        blocked: isUserBlocked,
        followingRequestSent: isFollowingSent,
    });

    const follow = async () => {
        switchOptimisticState("follow");
        try {
            await switchFollow(userId);
            setUserState((prev) => ({
                ...prev,
                following: prev.following && false,
                followingRequestSent:
                    !prev.following && !prev.followingRequestSent
                        ? true
                        : false,
            }));
        } catch (error) {
            console.error("Failed to follow user: ", error);
        }
    };

    const block = async () => {
        switchOptimisticState("block");
        try {
            await switchFollow(userId);
            setUserState((prev) => ({
                ...prev,
                blocked: !prev.blocked
            }));
        } catch (error) {
            console.error("Failed to follow user: ", error);
        }
    };

    const [optimisticState, switchOptimisticState] = useOptimistic(
        userState,
        (state, value: "follow" | "block") =>
            value === "follow"
                ? {
                      ...state,
                      following: state.following && false,
                      followingRequestSent:
                          !state.following && !state.followingRequestSent
                              ? true
                              : false,
                  }
                : {
                      ...state,
                      blocked: !state.blocked,
                  }
    );

    return (
        <div className="flex flex-col gap-2">
            <form action={follow}>
                <button className="text-white rounded-lg w-full bg-blue-500 p-2 text-xs font-medium hover:bg-blue-600 text-center">
                    {optimisticState.following
                        ? "Following"
                        : optimisticState.followingRequestSent
                        ? "Friend Request Sent"
                        : "Follow"}
                </button>
            </form>
            <form action={block} className="self-end">
                <button className="text-xs text-red-500 hover:underline cursor-pointer px-1">
                    {optimisticState.blocked ? "Unblock User" : "Block User"}
                </button>
            </form>
        </div>
    );
}

export default UserInfoCardInteraction;

"use client"

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import {
    FaHeart,
    FaRegCommentDots,
    FaRegHeart,
    FaRegShareSquare,
} from "react-icons/fa";

function PostInteraction({
    postId,
    likes,
    commentNumber,
}: {
    postId: number;
    likes: string[];
    commentNumber: number;
}) {
    const { isLoaded, userId } = useAuth();
    const [likeState, setLikeState] = useState({
        likeCount: likes.length,
        isLiked: userId ? likes.includes(userId) : false,
    });

    const [optimisticLike, switchOptimisticLike] = useOptimistic(
        likeState,
        (state, value) => {
            return {
                likeCount: state.isLiked
                    ? state.likeCount - 1
                    : state.likeCount + 1,
                isLiked: !state.isLiked,
            };
        }
    );

    const handleLike = () => {
        switchOptimisticLike("");
        try {
            switchLike(postId);
            setLikeState((prev) => ({
                likeCount: prev.isLiked
                    ? prev.likeCount - 1
                    : prev.likeCount + 1,
                isLiked: !prev.isLiked,
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <form action={handleLike} className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                <button>
                    {optimisticLike.isLiked ? (
                        <FaHeart className="text-lg text-[#ff3838] cursor-pointer" />
                    ) : (
                        <FaRegHeart className="text-lg text-[#4769ff] cursor-pointer" />
                    )}
                </button>
                <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                <span className="text-xs text-gray-500">
                    {optimisticLike.likeCount}
                    <span> Likes</span>
                </span>
            </form>
            <div className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                <FaRegCommentDots className="text-lg text-[#4769ff] cursor-pointer" />
                <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                <span className="text-xs text-gray-500">
                    {commentNumber}
                    <span> Comments</span>
                </span>
            </div>
            <div className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                <FaRegShareSquare className="text-lg text-[#4769ff] cursor-pointer" />
                <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                <span className="text-xs text-gray-500">
                    0
                    <span> Share</span>
                </span>
            </div>
        </div>
    );
}

export default PostInteraction;

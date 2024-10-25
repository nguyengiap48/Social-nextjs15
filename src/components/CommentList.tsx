"use client";

import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import { useOptimistic, useState } from "react";
import { FaRegHeart, FaSmile, FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

type CommentWithUser = Comment & { user: User };
function CommentList({
    comments,
    postId,
}: {
    comments: CommentWithUser[];
    postId: number;
}) {
    const { user } = useUser();
    const [commentState, setCommentState] = useState(comments);
    const [desc, setDesc] = useState("");

    const handleAddComment = async() => {
        if (!user || !desc.trim()) {
            return
        }
        addOptimisticComment({
            id: Math.random(),
            desc: desc,
            img:"",
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            postId: postId,
            userId: user.id,
            user: {
                id: user.id,
                name: "",
                avatar: user.imageUrl,
                username: "Sending Please Wait...",
                cover: '',
                surname: "",
                description: "",
                work: "",
                website: "",
                city: "",
                school: "",
                createdAt: new Date(Date.now()),
            }
        })

        try {
            const newComment = await addComment(postId, desc)

            setCommentState([newComment, ...commentState])
        } catch(err) {
            console.log(err);
        }
        
    }

    const [optimisticComment, addOptimisticComment] = useOptimistic(
        commentState,
        (state, value: CommentWithUser) => [value, ...state]
    );

    return (
        <>
            {user && (
                <div className="flex items-center gap-4 relative mt-4">
                    <img
                        src={user.imageUrl}
                        alt=""
                        className="w-8 h-8 rounded-full"
                    />
                    <form className="w-full" action={handleAddComment}>
                        <input
                            type="text"
                            className="rounded-full w-full outline-none py-2 px-4 bg-slate-200 flex-1"
                            placeholder="Write a comment..."
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <FaSmile className="text-lg text-yellow-500 absolute top-[28%] right-4" />
                    </form>
                </div>
            )}

            {/* Comment */}
            {optimisticComment.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                    {/* Avatar */}
                    <div className="">
                        <img
                            src={comment.user.avatar || ""}
                            alt=""
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex flex-col bg-slate-100 w-full px-2 py-1 rounded-lg">
                            <span className="font-semibold flex justify-between">
                                {comment.user.name && comment.user.surname
                                    ? comment.user.name +
                                      " " +
                                      comment.user.surname
                                    : comment.user.username}
                                <HiDotsHorizontal className="text-gray-500 cursor-pointer text-2xl" />
                            </span>
                            <p className="w-[95%] text-sm">
                                {comment.desc}
                            </p>
                        </div>
                        {/* Option comment */}
                        <div className="flex gap-6 items-center mx-2">
                            <div className="flex gap-2 items-center">
                                <FaRegHeart className="text-sm text-blue-500 cursor-pointer" />
                                <div className="w-[1px] h-4 bg-gray-300"></div>
                                <span className="text-xs text-gray-500">
                                    0
                                    <span> Likes</span>
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 cursor-pointer hover:underline">
                                Reply
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CommentList;

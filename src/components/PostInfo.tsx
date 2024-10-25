"use client";

import { deletePost } from "@/lib/actions";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

function PostInfo({ postId }: { postId: number }) {
    const [open, setOpen] = useState(false);

    const deletePostWithId = deletePost.bind(null, postId);
    return (
        <div className="flex justify-end flex-1 relative">
            <HiDotsHorizontal onClick={() => setOpen(!open)} className="text-2xl cursor-pointer text-[#434343]" />
            {
                open && (
                    <div className="absolute -bottom-[500%] -right-6 bg-[#e6e6e6] rounded-lg text-xs shadow-lg flex flex-col gap-2">
                        <span className="cursor-pointer px-6 rounded-t-lg py-2 hover:bg-white">View</span>
                        <span className="cursor-pointer px-6 rounded-t-lg py-2 hover:bg-white">Report</span>
                        <form className="" action={deletePostWithId}>
                            <button className="text-red-500 px-6 rounded-b-lg py-2 hover:bg-white">Delete</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default PostInfo;

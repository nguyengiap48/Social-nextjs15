"use client";

import prisma from "@/lib/client";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { FaCalendarAlt, FaPhotoVideo, FaPoll, FaSmile } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

function AddPost() {
    const { user, isLoaded } = useUser();
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState<any>(null);
    if (!isLoaded) {
        return "Loading...";
    }

    return (
        <div className="flex bg-white shadow-md rounded-lg p-4 gap-2 w-full">
            {/* Avatar */}
            <div>
                <img
                    src={user?.imageUrl || ""}
                    alt=""
                    className="w-12 h-12 rounded-full"
                />
            </div>

            {/* Post */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Post Input */}
                <form action={(formData) => addPost(formData, img?.secure_url || null)} className="flex gap-2 items-center">
                    <textarea
                        name="desc"
                        placeholder="What's on your mind?"
                        className="bg-slate-200 flex-1 rounded-lg p-2 text-sm outline-none"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                    <FaSmile className="self-end text-yellow-500" />
                    <AddPostButton />
                </form>
                {/* Post Option */}
                <div className="flex gap-2 flex-wrap">
                    <CldUploadWidget
                        uploadPreset="social"
                        onSuccess={(result, { widget }) => {
                            setImg(result.info);
                            widget.close();
                        }}
                    >
                        {({ open }) => {
                            return (
                                <div
                                    onClick={() => open()}
                                    className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer"
                                >
                                    <FaPhotoFilm className="text-base text-green-500" />
                                    <span>Photo</span>
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaPhotoVideo className="text-base text-pink-500" />
                        <span>Video</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaCalendarAlt className="text-base text-red-500" />
                        <span>Event</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaPoll className="text-base text-yellow-500" />
                        <span>Poll</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPost;

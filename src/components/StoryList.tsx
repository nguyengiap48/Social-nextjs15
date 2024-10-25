"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & { user: User };
function StoryList({ stories, userId }: { stories: StoryWithUser[], userId: string }) {
    const [storyList, setStoryList] = useState(stories);
    const [img, setImg] = useState<any>();

    const { user } = useUser();

    const handleAddStory = async () => {
        if (!img?.secure_url) {
            return;
        }

        addOptimisticStory({
            id: Math.random(),
            img: img.secure_url,
            createdAt: new Date(Date.now()),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: userId,
            user: {
                id: userId,
                name: "",
                avatar: user?.imageUrl || "",
                username: "Sending...",
                cover: "",
                surname: "",
                description: "",
                work: "",
                website: "",
                city: "",
                school: "",
                createdAt: new Date(Date.now()),
            },
        });
        try {
            const addNewStory = await addStory(img.secure_url);
            setStoryList([...storyList, addNewStory!]);
            setImg(null);
        } catch (err) {
            console.log(err);
        }
    };

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    );

    return (
        <>
            <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result, { widget }) => {
                    setImg(result.info);
                    widget.close();
                }}
            >
                {({ open }) => {
                    return (
                        <div className="flex flex-col gap-2 items-center justify-center cursor-pointer relative">
                            <div onClick={() => open()} className="flex items-center justify-center">
                                <img
                                    src={img?.secure_url || user?.imageUrl || ""}
                                    className="w-16 h-16 rounded-full ring-2 object-cover"
                                    alt=""
                                />
                                <div className="absolute text-6xl text-gray-200 top-[0px]">
                                    +
                                </div>
                            </div>
                            {img ? (
                                <form action={handleAddStory}>
                                    <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                                        Send
                                    </button>
                                </form>
                            ) : (
                                <span>Add a Story</span>
                            )}
                        </div>
                    );
                }}
            </CldUploadWidget>
            {optimisticStories.map((story) => (
                <div
                    key={story.id}
                    className="flex flex-col gap-2 items-center justify-center cursor-pointer"
                >
                    <img
                        src={story.img || ""}
                        className="w-16 h-16 rounded-full object-cover ring-2"
                        alt=""
                    />
                    <span>{story.user.name || story.user.username}</span>
                </div>
            ))}
        </>
    );
}

export default StoryList;

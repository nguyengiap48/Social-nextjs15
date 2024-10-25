import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

async function ProfilePage({ params }: { params: { username: string } }) {
    const username = params.username;

    const user = await prisma.user.findFirst({
        where: {
            username: username,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    followings: true,
                    posts: true,
                },
            },
        },
    });

    if (!user) {
        return notFound();
    }

    const { userId: currentUserId } = auth();

    let isBlocked;

    if (currentUserId) {
        const res = await prisma.block.findFirst({
            where: {
                blockerId: user?.id,
                blockedId: currentUserId,
            },
        });

        if (res) {
            isBlocked = true;
        }
    } else {
        isBlocked = false;
    }

    if (isBlocked) {
        return notFound();
    }

    return (
        <div className="flex gap-6 pt-6">
            <div className="hidden lg:block w-[20%]">
                <LeftMenu type="profile" />
            </div>
            <div className="w-full md:w-[70%] lg:w-[50%] ">
                <div className="flex flex-col gap-6">
                    <div className="p-4 rounded-lg bg-white shadow-md text-sm flex flex-col items-center">
                        <div className="relative w-full">
                            <img
                                alt=""
                                className="h-48 w-full rounded-lg object-cover"
                                src={user.cover || "https://e0.pxfuel.com/wallpapers/894/196/desktop-wallpaper-byakuya-kuchiki-art-ichigo-cartoon-bleach.jpg"}
                            />
                            <img
                                alt=""
                                className="w-32 h-32 rounded-full object-cover absolute -bottom-16 left-0 right-0 mx-auto ring-4 ring-white z-10 "
                                src={
                                    user?.avatar ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneXNkI3xNNMRFLEuMESbjxnxKB2bLJFMj0A&s"
                                }
                            />
                        </div>
                        <h1 className="font-semibold text-lg mt-[75px] mb-4">
                            {user.name && user.surname
                                ? user.name + " " + user.surname
                                : user.username}
                        </h1>
                        <div className="flex items-center gap-12 mb-4">
                            <div className="flex flex-col gap-2 text-sm items-center">
                                <span className="font-medium">
                                    {user?._count.posts}
                                </span>
                                <span className="text-xs text-gray-600">
                                    Posts
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 text-sm items-center">
                                <span className="font-medium">
                                    {user?._count.followers}
                                </span>
                                <span className="text-xs text-gray-600">
                                    Followers
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 text-sm items-center">
                                <span className="font-medium">
                                    {user?._count.followings}
                                </span>
                                <span className="text-xs text-gray-600">
                                    Following
                                </span>
                            </div>
                        </div>
                    </div>
                    <Feed username={user.username}/>
                </div>
            </div>
            <div className="hidden md:block w-[30%]">
                <RightMenu user={user} />
            </div>
        </div>
    );
}

export default ProfilePage;

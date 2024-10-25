import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function ProfileCard() {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                },
            },
        },
    });

    if (!user) {
        return null;
    }

    console.log("first", user);

    return (
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            <div className="relative">
                <img
                    alt=""
                    className="h-24 w-full rounded-lg object-cover"
                    src={
                        user?.cover ||
                        "https://e0.pxfuel.com/wallpapers/894/196/desktop-wallpaper-byakuya-kuchiki-art-ichigo-cartoon-bleach.jpg"
                    }
                />
                <img
                    alt=""
                    className="w-12 h-12 rounded-full object-cover absolute -bottom-6 left-0 right-0 mx-auto ring-1 ring-white z-10 "
                    src={
                        user?.avatar
                            ? user.avatar
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneXNkI3xNNMRFLEuMESbjxnxKB2bLJFMj0A&s"
                    }
                />
            </div>

            <div className="h-20 flex flex-col gap-2 items-center mt-6">
                <span className="font-semibold">
                    {user.name && user.surname
                        ? user.name + " " + user.surname
                        : user.username}
                </span>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <img
                            alt=""
                            className="w-3 h-3 object-cover rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneXNkI3xNNMRFLEuMESbjxnxKB2bLJFMj0A&s"
                        />
                        <img
                            alt=""
                            className="w-3 h-3 object-cover rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneXNkI3xNNMRFLEuMESbjxnxKB2bLJFMj0A&s"
                        />
                        <img
                            alt=""
                            className="w-3 h-3 object-cover rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTneXNkI3xNNMRFLEuMESbjxnxKB2bLJFMj0A&s"
                        />
                    </div>
                    <span className="text-xs text-gray-500">
                        {user?._count.followers} Followers
                    </span>
                </div>
                <Link href={`/profile/${user.username}`} className="bg-blue-500 text-white font-medium p-2 rounded-lg hover:bg-blue-600">
                    My Profile
                </Link>
            </div>
        </div>
    );
}

export default ProfileCard;

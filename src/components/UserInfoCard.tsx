import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Link from "next/link";
import { FaCalendar, FaCalendarAlt, FaSchool } from "react-icons/fa";
import { FaLink, FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

async function UserInfoCard({ user }: { user: User }) {
    const createdAtDate = new Date(user.createdAt);

    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowingSent = false;

    const { userId: currentUserId } = auth();

    if (currentUserId) {
        const blockRes = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: user.id,
            },
        });

        blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

        const followRes = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: user.id,
            },
        });

        followRes ? (isFollowing = true) : (isFollowing = false);

        const followReq = await prisma.followRequest.findFirst({
            where: {
                senderId: currentUserId,
                receiverId: user.id,
            },
        });

        followReq ? (isFollowingSent = true) : (isFollowingSent = false);
    }

    return (
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                    User Infomation
                </span>
                {currentUserId === user.id ? (
                    <UpdateUser user={user} />
                ) : (
                    <Link
                        href={"/"}
                        className="text-blue-500 text-xs hover:underline"
                    >
                        See all
                    </Link>
                )}
            </div>

            {/* BOTTOM */}
            <div className="mt-4 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <span className="text-lg ">
                        {user.name && user.surname
                            ? user.name + " " + user.surname
                            : user.username}
                    </span>
                    <span className="text-xs text-gray-500">
                        @{user.username}
                    </span>
                </div>

                {user.description && (
                    <p className="text-gray-500 text-xs">{user.description}</p>
                )}

                {user.city && (
                    <div className="text-gray-500 text-xs flex gap-2 items-center">
                        <FaLocationDot />
                        <span>
                            Living in
                            <b className="text-gray-600"> {user.city}</b>
                        </span>
                    </div>
                )}
                {user.school && (
                    <div className="text-gray-500 text-xs flex gap-2 items-center">
                        <FaSchool />
                        <span>
                            Studying in
                            <b className="text-gray-600"> {user.school}</b>
                        </span>
                    </div>
                )}
                {user.work && (
                    <div className="text-gray-500 text-xs flex gap-2 items-center">
                        <MdWork />
                        <span>
                            Work at
                            <b className="text-gray-600"> {user.work}</b>
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    {user.website && (
                        <div className="flex text-gray-500 text-sm items-center gap-2">
                            <FaLink />
                            <Link href={"/"} className="text-blue-500 text-xs">
                                {user.website}
                            </Link>
                        </div>
                    )}
                    <div className="flex text-gray-500 text-sm items-center gap-2">
                        <FaCalendarAlt />
                        <span className="text-xs">Joined {formattedDate}</span>
                    </div>
                </div>
                {currentUserId && currentUserId !== user.id && (
                    <UserInfoCardInteraction
                        userId={user.id}
                        currentUserId={currentUserId}
                        isUserBlocked={isUserBlocked}
                        isFollowing={isFollowing}
                        isFollowingSent={isFollowingSent}
                    />
                )}
            </div>
        </div>
    );
}

export default UserInfoCard;

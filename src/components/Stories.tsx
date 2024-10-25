import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { FaUserCircle } from "react-icons/fa";
import StoryList from "./StoryList";

async function Stories() {
    const { userId: currentUserId } = auth();
    if (!currentUserId) return null;

    const stories = await prisma.story.findMany({
        where: {
            expiresAt: {
                gt: new Date(),
            },
            OR: [
                {
                    user: {
                        followers: {
                            some: {
                                followerId: currentUserId,
                            },
                        },
                    },
                },
                {
                    userId: currentUserId,
                }
            ],
        },
        include: {
            user: true,
        }
    });

    console.log("stories", stories);
    
    return (
        <div className="scrollbar-hide p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm">
            <div className="w-full flex gap-8">
                <StoryList stories={stories} userId={currentUserId} />
            </div>
        </div>
    );
}

export default Stories;

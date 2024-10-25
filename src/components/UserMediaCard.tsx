import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Link from "next/link";

async function UserMediaCard({ user }: { user: User }) {
    const postWithMedia = await prisma.post.findMany({
        where: {
            userId: user.id,
            img: {
                not: null
            },
        },
        take: 8,
        orderBy: {
            createdAt: "desc"
        }
    })

    return (  
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm font-medium">
                    User Media
                </span>
                <Link
                    href={"/"}
                    className="text-blue-500 text-xs hover:underline"
                >
                    See all
                </Link>
            </div>

            {/* BOTTOM */}
            <div className="flex gap-4 justify-between flex-wrap mt-4">
                {postWithMedia.length ? postWithMedia.map(post => (
                    <div key={post.id} className="relative w-1/5">
                        <img alt="" className="object-cover rounded-lg" src={post.img || ""} />
                    </div>
                )) : (
                    "No media found!"
                )
                }
            </div>
        </div>
    );
}

export default UserMediaCard;
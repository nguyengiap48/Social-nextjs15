import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

async function Feed({ username }: { username?: string }) {
    const { userId } = auth();

    let posts: any[] = [];

    if (username) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    if (!username && userId) {
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId,
            },
            select: {
                followingId: true,
            },
        });

        const followingPosts = following.map((f) => f.followingId);
        console.log("following", followingPosts);
        followingPosts.push(userId); 

        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: followingPosts,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    return (
        <div className="flex flex-col rounded-lg gap-6 w-full">
            {posts.length ? posts.map((post) => 
                <Post key={post.id} post={post}/>
            ) : "No posts found!"}
        </div>
    );
}

export default Feed;

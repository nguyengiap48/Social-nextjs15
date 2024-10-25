
import Comment from "./Comment";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

type feedPostType = PostType & { user: User } & {
    likes: [{ userId: string }];
} & { _count: { comments: number } };
function Post({ post }: { post: feedPostType }) {
    const { userId } = auth()
    return (
        <div className="flex flex-col gap-4 bg-white w-full p-4 rounded-lg shadow-md">
            {/* Head Post*/}
            <div className="flex gap-4 items-center">
                <Link href={`/profile/${post.user.username}`} className="flex cursor-pointer gap-4 items-center">
                    <img
                        className="w-10 h-10 rounded-full"
                        alt=""
                        src={post.user.avatar || ""}
                    />
                    <span className="font-medium">
                        {post.user.name && post.user.surname
                            ? post.user.name + " " + post.user.surname
                            : post.user.username}
                    </span>
                </Link>

                {userId === post.user.id && <PostInfo postId={post.id}/>}
            </div>

            {/* Content Post */}
            {post.img !== null && (
                <div className="w-full">
                    <img
                        width={400}
                        height={400}
                        className="w-full object-cover rounded-lg"
                        alt="abc"
                        src={post.img}
                    />
                </div>
            )}

            {/* Description Post */}

            <p className="text-sm">{post.desc}</p>

            {/* Option Post */}
            <Suspense fallback="Loading...">

            <PostInteraction
                postId={post.id}
                likes={post.likes.map((like) => like.userId)}
                commentNumber={post._count.comments}
            />
            </Suspense>
            <Suspense fallback="Loading...">

            {/* Comment Post */}
            <Comment postId={post.id} />
            </Suspense>
        </div>
    );
}

export default Post;

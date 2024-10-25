import prisma from "@/lib/client";
import CommentList from "./CommentList";

async function Comment({ postId }: { postId: number }) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            user: true
        }
    })

    return (
        <div className="flex flex-col gap-6">
            <CommentList comments={comments} postId={postId}/>
        </div>
    );
}

export default Comment;

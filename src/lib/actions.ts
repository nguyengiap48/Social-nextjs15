"use server";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }

    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId,
            },
        });

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id,
                },
            });
            return false;
        } else {
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId,
                },
            });

            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id,
                    },
                });
            } else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId,
                    },
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated");
    }
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: userId,
            },
        });

        if (existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id,
                },
            });
            return false;
        } else {
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
};

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error(`User is not authenticated`);
    }

    try {
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            },
        });

        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id,
                },
            });

            await prisma.follower.create({
                data: {
                    followerId: userId,
                    followingId: currentUserId,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
};

export const declineFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error(`User is not authenticated`);
    }

    try {
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            },
        });

        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
};

export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; cover: string }
) => {
    const { formData, cover } = payload;

    const fields = Object.fromEntries(formData);

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([key, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        city: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    });

    const validatedData = Profile.safeParse({ ...filteredFields, cover });

    if (!validatedData.success) {
        console.log(validatedData.error.flatten().fieldErrors);
        return { success: false, error: true };
    }

    const { userId: currentUserId } = auth();
    if (!currentUserId) {
        throw new Error(`User is not authenticated`);
        return { success: false, error: true };
    }

    try {
        await prisma.user.update({
            where: {
                id: currentUserId,
            },
            data: validatedData.data,
        });
        return { success: true, error: false };
    } catch (err) {
        console.log("Error updating profile");
        return { success: false, error: true };
    }
};

export const switchLike = async (postId: number) => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    try {
        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    postId: postId,
                    userId: userId,
                },
            });
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to switch like");
    }
};

export const addComment = async (postId: number, desc: string) => {
    const { userId } = auth();
    if (!userId) {
        throw new Error("User is not authenticated");
    }
    try {
        const createComment = await prisma.comment.create({
            data: {
                postId: postId,
                userId: userId,
                desc: desc,
            },
            include: {
                user: true,
            },
        });

        return createComment;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add comment");
    }
};

export const addPost = async (formData: FormData, img: string) => {
    const desc = formData.get("desc") as string;

    const Desc = z.string().min(1).max(255);
    const validatedDesc = Desc.safeParse(desc);

    if (!validatedDesc.success) {
        console.log("description is not valid");
        return;
    }

    const { userId } = auth();

    if(!userId) {
        throw new Error("User is not authenticated");
        return;
    }
    try {
        await prisma.post.create({
            data: {
                userId: userId,
                desc: validatedDesc.data,
                img: img,
            }
        })

        revalidatePath("/")
    } catch (err) {
        console.log(err);
    }
};

export const addStory = async (img: string) => {

    const { userId } = auth();

    if(!userId) {
        throw new Error("User is not authenticated");
    }
    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId: userId,
            }
        })

        if(existingStory) {
            await prisma.story.delete({
                where: {
                    id: existingStory.id,
                },
            })
        }
        
        const newStory = await prisma.story.create({
            data: {
                userId: userId,
                img: img,
                expiresAt: new Date(Date.now() + 24*60*60*1000), // 1 hour
            },
            include: {
                user: true,
            }
        })

        return newStory
    } catch (err) {
        console.log(err);
    }
};

export const deletePost = async(postId: number) => {
    const { userId } = auth();

    if(!userId) {
        throw new Error("User is not authenticated");
    }

    try {
        await prisma.post.delete({
            where : {
                id: postId,
                userId: userId,
            }
        })

        revalidatePath("/")
    } catch(err) {
        console.log(err);
    }
}
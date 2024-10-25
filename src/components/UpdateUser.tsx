"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { MdClose } from "react-icons/md";

function UpdateUser({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    const [cover, setCover] = useState<any>();
    const router = useRouter()

    const [state, formAction] = useActionState(updateProfile, {
        success: false,
        error: false,
    });

    const handleClose = () => {
        setOpen(false);
        state.success && router.refresh()
    }


    return (
        <div className="hover:underline cursor-pointer text-xs text-blue-500">
            <span onClick={() => setOpen(true)}>UpdateUser</span>
            {open && (
                <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex z-10 items-center justify-center">
                    <form
                        action={(formData) =>
                            formAction({ formData, cover: cover?.secure_url || "" })
                        }
                        className="bg-white px-8 py-6 flex flex-col gap-4 w-[40vw] relative rounded-lg"
                    >
                        <MdClose
                            onClick={handleClose}
                            className="text-2xl absolute top-4 right-4 hover:text-blue-600"
                        />
                        <label className="text-lg font-medium">
                            Update Profile
                        </label>
                        <span className="text-gray-500 text-xs">
                            Use the navbar profile to change the avatar or
                            username.
                        </span>
                        <CldUploadWidget
                            uploadPreset="social"
                            onSuccess={(result) => setCover(result.info)}
                        >
                            {({ open }) => {
                                return (
                                    <div
                                        className="flex flex-col gap-2"
                                        onClick={() => open()}
                                    >
                                        <label className="text-lg font-medium">
                                            Cover picture
                                        </label>
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <img
                                                src={user.cover || ""}
                                                alt=""
                                                className="rounded-lg w-16 h-10 object-cover"
                                            />
                                            <span className="underline text-gray-500 text-xs">
                                                Change
                                            </span>
                                        </div>
                                    </div>
                                );
                            }}
                        </CldUploadWidget>

                        <div className="flex justify-between">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">First Name</label>
                                    <input
                                        type="text"
                                        placeholder={user.name || "name"}
                                        name="name"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Description</label>
                                    <input
                                        type="text"
                                        placeholder={
                                            user.description || "description"
                                        }
                                        name="description"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">School</label>
                                    <input
                                        type="text"
                                        placeholder={user.school || "school"}
                                        name="school"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Website</label>
                                    <input
                                        type="text"
                                        placeholder={user.website || "website"}
                                        name="website"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Surname</label>
                                    <input
                                        type="text"
                                        placeholder={user.surname || "surname"}
                                        name="surname"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">City</label>
                                    <input
                                        type="text"
                                        placeholder={user.city || "name"}
                                        name="city"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="">Work</label>
                                    <input
                                        type="text"
                                        placeholder={user.work || "work"}
                                        name="work"
                                        id=""
                                        className="outline-none px-2 py-3 rounded-lg border border-gray-300 w-48 "
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-2 bg-blue-500 rounded-lg text-center text-white font-medium">
                            Update
                        </button>
                        {state.success && (
                            <div className="mt-4 text-center text-green-500">
                                Profile updated successfully!
                            </div>
                        )}
                        {state.error && (
                            <div className="mt-4 text-center text-red-500">
                                An error occurred while updating the profile.
                            </div>
                        )}
                    </form>

                </div>
            )}
        </div>
    );
}

export default UpdateUser;

"use client";

import { useFormStatus } from "react-dom";

function AddPostButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="bg-blue-500 text-sm p-2 rounded-lg text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={pending}
        >
            {pending ? (
                <div className="">
                    Sending
                </div>
            ) : (
                <div className="">
                    Send
                </div>
            )}
        </button>
    );
}

export default AddPostButton;

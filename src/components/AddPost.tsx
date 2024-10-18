import { FaCalendarAlt, FaPhotoVideo, FaPoll, FaSmile, FaUserCircle } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";

function AddPost() {
    return (  
        <div className="flex bg-white shadow-md rounded-lg p-4 gap-2 w-full">
            {/* Avatar */}
            <div>
                <FaUserCircle className="w-10 h-10" />
            </div>

            {/* Post */}
            <div className="flex-1 flex flex-col gap-4">
                {/* Post Input */}
                <div className="flex gap-2">
                    <textarea placeholder="What's on your mind?" className="bg-slate-200 flex-1 rounded-lg p-1 text-sm outline-none"></textarea>
                    <FaSmile className="self-end text-yellow-500"/>
                </div>
                {/* Post Option */}
                <div className="flex gap-2 flex-wrap">
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaPhotoFilm className="text-base text-green-500" />
                        <span>Photo</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaPhotoVideo className="text-base text-pink-500" />
                        <span>Video</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaCalendarAlt className="text-base text-red-500" />
                        <span>Event</span>
                    </div>
                    <div className="flex gap-1 items-center text-xs text-[#4d4d4d] cursor-pointer">
                        <FaPoll className="text-base text-yellow-500" />
                        <span>Poll</span>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default AddPost;
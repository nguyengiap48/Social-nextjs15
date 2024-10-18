import { FaRegHeart, FaSmile, FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

function Comment() {
    return (
        <div className="flex flex-col gap-6">
            
            {/* Input comment */}
            <div className="flex items-center gap-4 relative mt-4">
                <FaUserCircle className="w-8 h-8" />
                <input
                    type="text"
                    className="rounded-full outline-none py-2 px-4 bg-slate-200 flex-1"
                    placeholder="Write a comment..."
                />
                <FaSmile className="text-lg text-yellow-500 absolute top-[25%] right-4" />
            </div>

            {/* Comment */}
            <div className="flex gap-4">
                {/* Avatar */}
                <div className="">
                    <FaUserCircle className="w-10 h-10"/>
                </div>
                {/* Description */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col bg-slate-100 w-full px-2 py-1 rounded-lg">
                        <span className="font-semibold flex justify-between">
                            Kyoo
                            <HiDotsHorizontal className="text-gray-500 text-2xl"/>
                        </span>
                        <span className="w-[95%]">fnawihufhnhbsfubfyuhfbhfebfu wfehdsafuyb ysfsbyufjb yfsbyfsedhf ys</span>
                    </div>
                    {/* Option comment */}
                    <div className="flex gap-6 items-center mx-2">
                        <div className="flex gap-2 items-center">
                            <FaRegHeart className="text-sm text-blue-500 cursor-pointer"/>
                            <div className="w-[1px] h-4 bg-gray-300"></div>
                            <span className="text-xs text-gray-500">
                                123
                                <span> Likes</span>
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 cursor-pointer hover:underline">Reply</span>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Comment;

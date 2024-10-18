import Image from "next/image";
import { FaRegCommentDots, FaRegComments, FaRegHeart, FaRegShareSquare, FaSmile, FaUserCircle } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import Comment from "./Comment";

function Post() {
    return (  
        <div className="flex flex-col gap-4 mb-6">
            {/* Head Post*/}
            <div className="flex gap-4 items-center">
                <FaUserCircle className="w-10 h-10"/>
                <span className="font-medium">Kyoo</span>

                <div className="flex justify-end flex-1">
                    <HiDotsHorizontal className="text-2xl cursor-pointer text-[#434343]"/>
                </div>
            </div>

            {/* Content Post */}
            <div className="w-full min-h-96">
                <Image width={400} height={400}  className="w-full object-cover rounded-lg" alt="abc" src={'https://i.pinimg.com/originals/7d/a9/48/7da948b0c65036dbff8379b7cef9b719.jpg'} />
            </div>

            {/* Description Post */}
            <div>
                <span>fbahiufhgujhgw hfiuhwasfugfw fuhweifagsflhdjbs hfe wasufesjkfebsfsdvds fsadfsafs fsf</span>
            </div>

            {/* Option Post */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                    <FaRegHeart className="text-lg text-[#4769ff] cursor-pointer" />
                    <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                    <span className="text-xs text-gray-500">123
                        <span> Likes</span>
                    </span>
                </div>
                <div className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                    <FaRegCommentDots className="text-lg text-[#4769ff] cursor-pointer" />
                    <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                    <span className="text-xs text-gray-500">123
                        <span> Comments</span>
                    </span>
                </div>
                <div className="flex items-center gap-4 bg-slate-100 rounded-full py-2 px-4">
                    <FaRegShareSquare className="text-lg text-[#4769ff] cursor-pointer" />
                    <div className="w-[1px] h-5 bg-[#cccccc]"></div>
                    <span className="text-xs text-gray-500">123
                        <span> Shares</span>
                    </span>
                </div>
            </div>

            {/* Comment Post */}
            <Comment />
        </div>
    );
}

export default Post;
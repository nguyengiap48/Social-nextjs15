import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { FaCircleUser, FaShop } from "react-icons/fa6";
import { GiPostOffice } from "react-icons/gi";
import { LuActivitySquare } from "react-icons/lu";
import { CgCalendarDates, CgStudio } from "react-icons/cg";
import { BiNews, BiPhotoAlbum, BiVideo } from "react-icons/bi";
import { LiaListUlSolid } from "react-icons/lia";
import { FcSettings } from "react-icons/fc";
import Ad from "./Ad";

function LeftMenu({ type } : { type: "home" | "profile"}) {
    return (  
        <div className="flex flex-col gap-6">
            { type === "home" && <ProfileCard /> }
            <div className="p-4 rounded-lg bg-white shadow-md text-sm text-gray-500 flex flex-col gap-2">
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <GiPostOffice className="w-5 h-5 text-yellow-500"/>
                    <span className="">My Posts</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <LuActivitySquare className="w-5 h-5 text-sky-400"/>
                    <span className="">Activity</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <FaShop className="w-5 h-5 text-orange-500"/>
                    <span className="">Market place</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <CgCalendarDates className="w-5 h-5 text-red-600"/>
                    <span className="">Events</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <BiPhotoAlbum className="w-5 h-5 text-green-600"/>
                    <span className="">Albums</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <BiVideo className="w-5 h-5 text-slate-700"/>
                    <span className="">Videos</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <BiNews className="w-5 h-5 text-blue-600"/>
                    <span className="">News</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <CgStudio className="w-5 h-5 text-pink-500"/>
                    <span className="">Courses</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <LiaListUlSolid className="w-5 h-5 text-purple-600"/>
                    <span className="">Lists</span>
                </Link>
                <Link href={'/'} className="flex items-center gap-4 rounded-lg hover:bg-slate-100 p-2">
                    <FcSettings className="w-5 h-5 text-yellow-600"/>
                    <span className="">Settings</span>
                </Link>
            </div>
            <Ad size="sm" />
        </div>
    );
}

export default LeftMenu;
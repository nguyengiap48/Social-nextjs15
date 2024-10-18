import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FaBell, FaHistory, FaHome, FaRegBell, FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaMessage, FaPeopleGroup, FaRegMessage, FaUserGroup } from "react-icons/fa6";

function Navbar() {
    return (  
        <div className="flex items-center h-16 justify-between">
            {/* LEFT */}
            <Link href={'/'} className="font-bold text-xl w-[20%] text-blue-500 md:hidden lg:block">ZAPSOCIAL</Link>
            
            {/* CENTER */}
            <div className="hidden w-[50%] md:flex gap-6 text-[#4f4f4f] text-sm">
                <Link href={'/'} className="flex items-center gap-1">
                    <FaHome />
                    <span>
                        Homepage
                    </span>
                </Link>
                <Link href={'/'} className="flex items-center gap-1">
                    <FaUserFriends />
                    <span>
                        Friends
                    </span>
                </Link>
                <Link href={'/'} className="flex items-center gap-1">
                    <FaHistory />
                    <span>
                        Stories
                    </span>
                </Link>

                <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-lg">
                    <input type="text" placeholder="search..." className="bg-transparent outline-none " />
                    <FaSearch className="text-[#585858]"/>
                </div>
            </div>
            
            {/* Right */}
            <div className="flex w-[30%] items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>

                <ClerkLoaded>
                    <SignedIn>
                        <div className="hidden md:flex gap-6">
                            <FaUserGroup className="text-[#4f4f4f] cursor-pointer hover:text-[#2a2626] text-lg" />
                            <FaMessage className="text-[#4f4f4f] cursor-pointer hover:text-[#2a2626] text-lg" />
                            <FaBell className="text-[#4f4f4f] cursor-pointer hover:text-[#2a2626] text-lg" />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-2">
                            <FaRegUserCircle className="text-xl"/>
                            <Link href={'/sign-in'} className="text-sm">Login/Register</Link>
                        </div>

                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    );
}

export default Navbar;
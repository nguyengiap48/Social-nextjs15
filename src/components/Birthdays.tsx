import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";

function Birthdays() {
    return (  
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            <div className="flex flex-col gap-4">
                {/* TOP */}
                <div className="text-gray-500 font-medium text-sm">Birthdays</div>
                {/* CENTER */}
                <div className="flex gap-2 items-center">
                    <FaUserCircle className="w-10 h-10"/>
                    <span className="font-semibold text-md">Kyoo</span>
                    <button className="ml-auto bg-blue-600 px-2 text-xs py-1 hover:bg-blue-700 text-white rounded-lg">Celebrate</button>
                </div>
                {/* BOTTOM */}
                <div className="bg-gray-100 rounded-lg px-2 py-4">
                    <div className="flex gap-2 items-center">
                        <FaGift className="w-8 h-8 text-gray-500"/>
                        <Link href={'/'} className="flex flex-col gap-1">
                            <span className="text-xs font-medium">Upcoming Birthdays</span>
                            <span className="text-gray-500 text-xs">See other 16 have upcoming birthdays</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Birthdays;
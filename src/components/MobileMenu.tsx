'use client'

import Link from "next/link";
import { useState } from "react";

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (  
        <div className="md:hidden">
            <div className="flex flex-col gap-[4.5px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm p-0 m-0 ${isOpen && 'rotate-45'} origin-left ease-in-out duration-500`}></div>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm p-0 m-0 ${isOpen && 'opacity-0'} ease-in-out duration-500`}></div>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm p-0 m-0 ${isOpen && '-rotate-45'} origin-left ease-in-out duration-500`}></div>
            </div>

            {
                isOpen && (
                    <div className="absolute left-0 top-16 w-full h-[calc(100vh-64px)] bg-slate-100 flex flex-col gap-4 font-medium text-xl z-10 justify-center items-center">
                        <Link href={'/'}>Home</Link>
                        <Link href={'/'}>Friends</Link>
                        <Link href={'/'}>Groups</Link>
                        <Link href={'/'}>Stories</Link>
                        <Link href={'/'}>Login</Link>
                    </div>
                )
            }
        </div>
    );
}

export default MobileMenu;
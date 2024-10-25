import Image from "next/image";
import { FaCableCar } from "react-icons/fa6";
import { FiMoreHorizontal } from "react-icons/fi";

function Ad({ size }: { size: 'sm' | 'md' | 'lg' }) {
    return (  
        <div className="p-4 rounded-lg bg-white shadow-md text-sm">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <span className="text-gray-500 font-medium">Sponsored Ads</span>
                <FiMoreHorizontal className="text-gray-500 text-xl"/>
            </div>
            {/* BOTTOM */}
            <div className={`flex flex-col mt-4 ${size === 'sm' ? "gap-2" : "gap-4"}`}>
                <div className={`relative w-full ${size === 'sm' ? "h-24" : size === 'md' ? 'h-36' : 'h48'}`}>
                    <img alt="" className="w-full object-cover rounded-lg max-h-full" src={'https://wallpapers.com/images/featured/green-background-ivfksvptao7sdhrg.jpg'} />
                </div>

                <div className="flex items-center gap-4">
                    <img alt="" className="object-cover rounded-full h-6 w-6" src={'https://e0.pxfuel.com/wallpapers/894/196/desktop-wallpaper-byakuya-kuchiki-art-ichigo-cartoon-bleach.jpg'} />
                    <span className="text-blue-500 font-medium">Zap</span>
                </div>
                <p className={size === 'sm' ? 'text-xs' : 'text-sm'}>
                    {
                        size ==='sm'? 
                        "Commercial car rental, 5-star hotel, and 10-minute bike ride"
                        : size === 'md' ?
                        "Commercial car rental, 5-star hotel, and 10-minute bike ride. A fantastic spot for a quick and enjoyable night out."
                        : "Commercial car rental, 5-star hotel, and 10-minute bike ride. A fantastic spot for a quick and enjoyable night out. ar hotel, and 10-minute bike ride. A fantastic spot for a quick and enjoyable night out"
                         
                    }
                </p>

                <button className="bg-slate-200 text-gray-500 text-xs font-medium rounded-lg w-full text-center p-2">Learn more</button>
            </div>
        </div>
    );
}

export default Ad;
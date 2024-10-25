import AddPost from "@/components/AddPost";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden lg:block w-[20%]">
        <LeftMenu type="home"/>
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%]  mb-16">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <RightMenu/>
      </div>
    </div>
  )
}

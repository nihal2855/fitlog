"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { todayPlan, savedPlan } = usePlan();

    const isActive = (path) => pathname === path;

    return (
        <div className="bg-[#0a0a0a] border-b border-gray-800">
            <div className="navbar relative container mx-auto px-4 md:px-8 py-3">
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white" >
                            <Menu size={24} />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-[#0a0a0a] border border-gray-800 rounded-box w-48" >
                            <li> <Link href="/" className={isActive("/") ? "text-[#caff33]" : "text-gray-400 hover:text-white"} > Workouts </Link> </li>
                            <li> <Link href="/my-plan" className={isActive("/my-plan") ? "text-[#caff33]" : "text-gray-400 hover:text-white"} > My Plan </Link> </li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center lg:navbar-start">
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity gap-2" >
                        <Image src={logo} alt="FITLOG" width={140} height={40} className="w-auto h-8 md:h-9 object-contain" priority />

                        <span className="text-2xl font-extrabold uppercase tracking-tight text-white">
                            FITLOG
                        </span>
                    </Link>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:block">
                    <ul className="flex items-center gap-2 font-medium">

                        <li>
                            <Link href="/" className={isActive("/") ? "bg-[#1e2612] text-[#caff33] px-6 py-2 rounded-full hover:bg-[#253016] transition-colors" : "text-gray-400 hover:text-white px-6 py-2 transition-colors"} > Workouts </Link>
                        </li>
                        <li>
                            <Link href="/my-plan" className={isActive("/my-plan") ? "bg-[#1e2612] text-[#caff33] px-6 py-2 rounded-full hover:bg-[#253016] transition-colors" : "text-gray-400 hover:text-white px-6 py-2 transition-colors"} > My Plan </Link>
                        </li>

                    </ul>
                </div>

                <div className="navbar-end gap-2 sm:gap-4 md:gap-6 font-medium text-sm md:text-base">

                    <Link href="/my-plan" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-gray-300 hidden sm:inline">
                            Plan
                        </span>
                        <div className="bg-[#caff33] text-black w-7 h-7 flex items-center justify-center rounded-full font-bold">
                            {todayPlan?.length || 0}
                        </div>
                    </Link>

                    <Link href="/my-plan" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity">
                        <span className="text-gray-300 hidden sm:inline">
                            Saved
                        </span>

                        <div className="border border-gray-600 text-gray-400 w-7 h-7 flex items-center justify-center rounded-full font-bold">
                            {savedPlan?.length || 0}
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
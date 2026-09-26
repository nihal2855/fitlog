import React from "react";
import Image from "next/image";
import Banner_image from '@/assets/banner.png';
import Link from "next/link";

const Banner = () => {
    return (
        <section className="container mx-auto px-4 md:px-8 py-6">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#15171c] min-h-[440px] md:min-h-[448px]">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 md:px-14 lg:px-16">
                        <span className="mb-6 text-xs font-bold tracking-[0.15em] text-lime-400 uppercase">
                            Workout Library
                        </span>
                        <h1 className="max-w-[620px] text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[0.95] font-black tracking-tight text-white uppercase">
                            Train with intent. Log every set.
                        </h1>
                        <p className="mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-400">
                            FitLog is a dark, no-nonsense gym companion: pick a lift,
                            lock it into today's plan, and watch the week's work add up.
                        </p>
                        <div className="mt-7">
                            <Link href='/workouts' className="rounded-md bg-lime-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-all duration-200 hover:bg-lime-300 hover:-translate-y-0.5">
                                Browse Workouts
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex items-end justify-center md:justify-end min-h-[280px] md:min-h-0">
                        <div className="relative h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] md:h-[390px] md:w-[390px] lg:h-[430px] lg:w-[430px] md:mr-4 lg:mr-8">
                            <Image src={Banner_image} alt="Workout illustration" fill priority className="object-contain object-bottom" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
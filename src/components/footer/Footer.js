import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '@/assets/logo.png';

const Footer = () => {
    return (<>
        <div className="bg-[#090a0d] border-t border-gray-800">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

                    <div className="w-full sm:w-auto">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" >
                            <Image src={logo} alt="FITLOG" width={140} height={40} className="w-auto h-8 md:h-9 object-contain" priority />
                            <span className="text-2xl font-extrabold uppercase tracking-tight text-white">
                                FITLOG
                            </span>
                        </Link>
                    </div>

                    <div className="w-full sm:w-auto text-center sm:text-right">
                        <p className="text-sm md:text-base text-gray-500">
                            © 2026 FitLog - Workout Library. Train hard, log honest.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </>);
};

export default Footer;
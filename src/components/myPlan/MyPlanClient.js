'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star, Check, X } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';

export default function MyPlanClient() {
    const {
        todayPlan,
        savedPlan,
        stats,
        removeFromToday,
        removeFromSaved,
        markAsDone,
    } = usePlan();

    const [activeTab, setActiveTab] = useState('today');
    const [sortBy, setSortBy] = useState('duration');
    const [toast, setToast] = useState(null);

    const currentList = activeTab === 'today' ? todayPlan : savedPlan;

    const sortedList = [...currentList].sort((a, b) => {
        if (sortBy === 'duration') {
            return Number(a.duration || 0) - Number(b.duration || 0);
        }
        if (sortBy === 'calories') {
            return Number(a.caloriesBurned || 0) - Number(b.caloriesBurned || 0);
        }
        if (sortBy === 'rating') {
            return Number(b.rating || 0) - Number(a.rating || 0);
        }
        return 0;
    });

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message, type = 'alert-info') => {
        setToast({ message, type });
    };

    const handleMarkAsDone = (id) => {
        markAsDone(id);
        showToast("Workout marked as done!", "alert-success");
    };

    const handleRemove = (id) => {
        if (activeTab === 'today') {
            removeFromToday(id);
            showToast("Removed from today's plan.", "alert-info");
        } else {
            removeFromSaved(id);
            showToast("Removed from saved workouts.", "alert-info");
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4 py-8 md:px-8">
                <div>
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight">
                        MY PLAN
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                <div className="mt-8 flex flex-col divide-y divide-[#252525] rounded-xl border border-[#252525] bg-[#121418] md:flex-row md:divide-x md:divide-y-0">
                    <div className="flex-1 px-6 py-6 md:px-8">
                        <div className="mb-2 text-sm text-gray-500">Exercises</div>
                        <div className="text-4xl font-bold text-[#baff00] md:text-5xl">{stats.exercises}</div>
                    </div>
                    <div className="flex-1 px-6 py-6 md:px-8">
                        <div className="mb-2 text-sm text-gray-500">Minutes</div>
                        <div className="text-4xl font-bold text-white md:text-5xl">{stats.minutes}</div>
                    </div>
                    <div className="flex-1 px-6 py-6 md:px-8">
                        <div className="mb-2 text-sm text-gray-500">Calories</div>
                        <div className="text-4xl font-bold text-white md:text-5xl">{stats.calories}</div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-fit items-center rounded-xl border border-[#252525] bg-[#121418] p-1">
                        <button type="button" onClick={() => setActiveTab('today')} className={`rounded-xl px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'today' ? 'bg-[#202632] text-white' : 'text-gray-500 hover:text-gray-300'}`} >
                            Today's Plan
                        </button>
                        <button type="button" onClick={() => setActiveTab('saved')} className={`rounded-xl px-6 py-2 text-sm font-medium transition-colors ${activeTab === 'saved' ? 'bg-[#202632] text-white' : 'text-gray-500 hover:text-gray-300'}`} >
                            Saved
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-500">Sort By</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none cursor-pointer rounded-lg border border-[#252525] bg-[#121418] py-2 pl-4 pr-10 text-sm text-gray-200 outline-none transition-colors hover:border-[#404040] focus:border-gray-500"
                            >
                                <option value="duration">Duration</option>
                                <option value="calories">Calories</option>
                                <option value="rating">Rating</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    {sortedList.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#252525] bg-transparent p-8 text-center">
                            <h2 className="text-xl font-extrabold uppercase tracking-wide text-white">
                                NOTHING HERE YET
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Browse the library and add a lift to get today moving.
                            </p>
                            <Link
                                href="/workouts"
                                className="mt-6 rounded-full bg-[#baff00] px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-[#a8e600]"
                            >
                                Go to workouts
                            </Link>
                        </div>
                    ) : (
                        sortedList.map((workout) => (
                            <div key={workout.id} className="flex flex-col items-center gap-4 rounded-2xl border border-[#252525] bg-[#121418] p-4 sm:flex-row sm:gap-6" >
                                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-40">
                                    <Image src={workout.image} alt={workout.name} fill sizes="(max-width: 640px) 100vw, 160px" className="object-cover" />
                                </div>

                                <div className="flex w-full flex-1 flex-col gap-2">
                                    <div className="flex w-full flex-col sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h2 className="text-lg font-extrabold uppercase tracking-wide text-white">
                                                {workout.name}
                                            </h2>
                                            <p className="text-sm text-gray-500">{workout.equipment}</p>
                                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={14} color="#baff00" /> {workout.duration} min
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Flame size={14} color="#baff00" fill="#baff00" /> {workout.caloriesBurned} kcal
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Star size={14} color="#baff00" /> {workout.rating}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-0">
                                            <Link href={`/workouts/${workout.id}`} className="rounded-full border border-[#303030] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#202632]" >
                                                View Details
                                            </Link>

                                            {activeTab === 'today' && (
                                                <button type="button" onClick={() => handleMarkAsDone(workout.id)} className="flex items-center gap-2 rounded-full bg-[#baff00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#a8e600]" >
                                                    <Check size={16} strokeWidth={3} /> Mark as Done
                                                </button>
                                            )}

                                            <button type="button" onClick={() => handleRemove(workout.id)} className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-[#202632] hover:text-white" aria-label="Remove" >
                                                <X size={18} strokeWidth={2} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {toast && (
                <div className="toast toast-top toast-end z-[9999] mt-16">
                    <div className={`alert ${toast.type}`}>
                        <span className="text-sm font-medium text-white">{toast.message}</span>
                    </div>
                </div>
            )}
        </main>
    );
}
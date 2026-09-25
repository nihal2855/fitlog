import React from 'react';
import Image from 'next/image';
import WorkoutActions from '@/components/workout/WorkoutActions';

async function getWorkout(id) {
    const res = await fetch(
        `https://api.abcz.workers.dev/api/fitlog/${id}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch workout');
    }

    return res.json();
}

const page = async ({ params }) => {
    const { id } = await params;
    const workoutData = await getWorkout(id);

    const workout = {
        ...workoutData,
        id: workoutData.id || id,
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4 py-8 md:px-8 md:py-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                    <div className="relative h-[400px] overflow-hidden rounded-xl sm:h-[500px] lg:h-[550px]">
                        <Image src={workout.image} alt={workout.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
                            {workout.name}
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
                            {workout.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {workout.muscleGroups?.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="badge badge-success border-0 bg-[#baff00] px-3 py-3 text-[11px] font-bold text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        <div className="card mt-5 border border-[#252525] bg-[#151922] shadow-none">
                            <div className="card-body p-0">
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Equipment
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.equipment}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Difficulty
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Sets
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.sets}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Reps
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.reps}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Duration
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.duration} min
                                    </span>
                                </div>
                                <div className="flex items-center justify-between border-b border-[#252525] px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Calories
                                    </span>
                                    <span className="text-xs text-gray-200">
                                        {workout.caloriesBurned} kcal
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-4 py-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Rating
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-xs text-gray-200">
                                            {workout.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-sm font-extrabold uppercase tracking-wide">
                                Instructions
                            </h2>
                            <div className="mt-4 space-y-3">
                                {workout.instructions?.map((instruction, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="w-4 shrink-0 text-xs text-gray-500">
                                            {index + 1}.
                                        </span>
                                        <p className="text-xs leading-5 text-gray-400">
                                            {instruction}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <WorkoutActions workout={workout} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;

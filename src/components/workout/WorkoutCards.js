import React from 'react';
import WorkoutCard from '@/components/workout/Workout'
import Link from 'next/link';

async function getWorkouts() {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const WorkoutCards = async () => {
    const workouts = await getWorkouts();
    return (<>
        <div className="min-h-screen">
            <div className="container mx-auto px-4 md:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workouts.map((item) => (
                        <Link key={item.id} href={`/workouts/${item.id}`}>
                            <WorkoutCard key={item.id} workout={item} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </>);
};

export default WorkoutCards;
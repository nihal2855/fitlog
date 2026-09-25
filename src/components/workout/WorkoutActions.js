'use client';

import { useState, useEffect } from 'react';
import { usePlan } from '@/context/PlanContext';
import { Bookmark, Calendar } from 'lucide-react';

export default function WorkoutActions({ workout }) {
    const { todayPlan, savedPlan, addToToday, saveForLater, } = usePlan();

    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const showToast = (message, type = 'alert-info') => {
        setToast({ message, type });
    };

    const handleAddToToday = () => {
        const isInToday = todayPlan.some(
            (item) => String(item.id) === String(workout.id)
        );

        if (isInToday) {
            showToast("This workout is already added to today's plan.", "alert-warning");
            return;
        }

        if (todayPlan.length >= 5) {
            showToast("Today's plan is full (maximum 5 workouts).", "alert-error");
            return;
        }

        const result = addToToday(workout);
        showToast(result.message || "Added to today's plan successfully!", "alert-success");
    };

    const handleSave = () => {
        const isSaved = savedPlan.some(
            (item) => String(item.id) === String(workout.id)
        );

        if (isSaved) {
            showToast("This workout is already saved for later.", "alert-warning");
            return;
        }

        const result = saveForLater(workout);
        showToast(result.message || "Saved for later successfully!", "alert-success");
    };

    return (
        <>
            <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={handleAddToToday} className="btn btn-primary border-0 bg-[#baff00] px-5 text-md font-bold text-black hover:bg-[#a8e600]" >
                    <span><Calendar /></span>
                    Add to today's plan
                </button>

                <button type="button" onClick={handleSave} className="btn btn-outline border-[#303030] px-5 text-md font-medium text-gray-300 hover:border-gray-500 hover:bg-transparent hover:text-white" >
                    <span><Bookmark /></span>
                    Save for later
                </button>
            </div>

            {toast && (
                <div className="toast toast-top toast-end z-[9999] mt-16">
                    <div className={`alert ${toast.type}`}>
                        <span className="text-sm font-medium text-white">{toast.message}</span>
                    </div>
                </div>
            )}
        </>
    );
}
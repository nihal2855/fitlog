'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const PlanContext = createContext(null);

const STORAGE_KEY = 'fitlog-plan';

const EMPTY_DATA = { todayPlan: [], savedPlan: [] };

function readStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return { ...EMPTY_DATA };

        const data = JSON.parse(stored);
        return {
            todayPlan: Array.isArray(data.todayPlan) ? data.todayPlan : [],
            savedPlan: Array.isArray(data.savedPlan) ? data.savedPlan : [],
        };
    } catch (error) {
        console.error('Failed to read plan:', error);
        return { ...EMPTY_DATA };
    }
}

function writeStorage(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save plan:', error);
    }
}

export function PlanProvider({ children }) {
    const [todayPlan, setTodayPlan] = useState([]);
    const [savedPlan, setSavedPlan] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const data = readStorage();
        setTodayPlan(data.todayPlan);
        setSavedPlan(data.savedPlan);
        setHydrated(true);
    }, []);

    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key !== STORAGE_KEY) return;

            const data = readStorage();
            setTodayPlan(data.todayPlan);
            setSavedPlan(data.savedPlan);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const mutate = useCallback((updateFn) => {
        const current = readStorage();
        const next = updateFn(current);

        if (!next) {
            return { success: false, message: null, aborted: true };
        }

        writeStorage(next.data);
        setTodayPlan(next.data.todayPlan);
        setSavedPlan(next.data.savedPlan);

        return { success: true, message: next.message };
    }, []);

    const addToToday = (workout) => {
        const result = mutate((current) => {
            if (current.todayPlan.length >= 5) {
                return {
                    data: current,
                    message: null,
                    _early: {
                        success: false,
                        message: 'You can add maximum 5 exercises for today.',
                    },
                };
            }

            const exists = current.todayPlan.some(
                (item) => String(item.id) === String(workout.id)
            );

            if (exists) {
                return {
                    data: current,
                    _early: {
                        success: false,
                        message: 'This exercise is already in today’s plan.',
                    },
                };
            }

            return {
                data: {
                    todayPlan: [...current.todayPlan, workout],
                    savedPlan: current.savedPlan.filter(
                        (item) => String(item.id) !== String(workout.id)
                    ),
                },
                message: 'Added to today’s plan.',
            };
        });

        return result._early || result;
    };

    const saveForLater = (workout) => {
        const result = mutate((current) => {
            const exists = current.savedPlan.some(
                (item) => String(item.id) === String(workout.id)
            );

            if (exists) {
                return {
                    data: current,
                    _early: {
                        success: false,
                        message: 'This exercise is already saved.',
                    },
                };
            }

            return {
                data: {
                    todayPlan: current.todayPlan,
                    savedPlan: [...current.savedPlan, workout],
                },
                message: 'Saved for later.',
            };
        });

        return result._early || result;
    };

    const removeFromToday = (id) => {
        mutate((current) => ({
            data: {
                todayPlan: current.todayPlan.filter(
                    (item) => String(item.id) !== String(id)
                ),
                savedPlan: current.savedPlan,
            },
            message: null,
        }));
    };

    const removeFromSaved = (id) => {
        mutate((current) => ({
            data: {
                todayPlan: current.todayPlan,
                savedPlan: current.savedPlan.filter(
                    (item) => String(item.id) !== String(id)
                ),
            },
            message: null,
        }));
    };

    const markAsDone = (id) => {
        mutate((current) => ({
            data: {
                todayPlan: current.todayPlan.filter(
                    (item) => String(item.id) !== String(id)
                ),
                savedPlan: current.savedPlan,
            },
            message: null,
        }));
    };

    const stats = useMemo(() => {
        return {
            exercises: todayPlan.length,

            minutes: todayPlan.reduce(
                (total, workout) =>
                    total + Number(workout.duration || 0),
                0
            ),

            calories: todayPlan.reduce(
                (total, workout) =>
                    total + Number(workout.caloriesBurned || 0),
                0
            ),
        };
    }, [todayPlan]);

    if (!hydrated) {
    }

    return (
        <PlanContext.Provider
            value={{
                todayPlan,
                savedPlan,
                stats,
                addToToday,
                saveForLater,
                removeFromToday,
                removeFromSaved,
                markAsDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error('usePlan must be used inside PlanProvider');
    }

    return context;
}
export default function WorkoutCard({ workout }) {
    return (
        <div className="bg-[#1c1f26] rounded-xl overflow-hidden flex flex-col">
            <div className="relative w-full h-48">
                <img src={workout.image} alt={workout.name} className="w-full h-full object-fill" />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4">
                    {workout.muscleGroups.map((muscle, index) => (
                        <span key={index} className="bg-[#c2ff00] text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider" > {muscle} </span>
                    ))}
                </div>

                <h2 className="text-lg text-white font-bold uppercase tracking-wide mb-1">
                    {workout.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {workout.equipment}
                </p>

                <div className="flex items-center gap-4 text-gray-400 text-xs font-medium border-t border-gray-600 pt-4">
                    <span className="flex items-center gap-1">
                        ⏱ {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                        🔥 {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                        ⭐ {workout.rating}
                    </span>
                </div>
            </div>
        </div>
    );
}
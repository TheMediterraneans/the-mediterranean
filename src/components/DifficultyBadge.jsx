function DifficultyBadge({ level }) {
  // Map difficulty levels to DaisyUI/Tailwind classes
  const classes = {
    hard: "badge badge-md bg-gradient-to-r from-red-500 to-orange-400 text-white",
    medium: "badge badge-md bg-yellow-300 text-gray-800",
    easy: "badge badge-md bg-gradient-to-r from-green-400 to-blue-400 text-white",
  };

  // Normalize the key (e.g. "hard" → "hard")
  const key = level.toLowerCase();
  const badgeClass = classes[key] || "badge badge-md";

  return <span className={badgeClass}>{level}</span>;
}

export default DifficultyBadge;

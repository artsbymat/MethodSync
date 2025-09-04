export const difficultyColors = {
  easy: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30"
};

export const difficultyOptions = [
  { value: "easy", label: "Easy", color: difficultyColors.easy },
  {
    value: "medium",
    label: "Medium",
    color: difficultyColors.medium
  },
  { value: "hard", label: "Hard", color: difficultyColors.hard }
];

export const timeLimitOptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" }
];

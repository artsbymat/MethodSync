export const initialRooms = [
  {
    id: "1",
    title: "Array Algorithms Challenge",
    description: "Master sorting and searching algorithms",
    difficulty: "Medium",
    participants: 3,
    maxParticipants: 6,
    host: "Alex Chen",
    timeLimit: "45 min",
    status: "waiting",
    tags: ["Arrays", "Sorting", "Binary Search"]
  },
  {
    id: "2",
    title: "React Hooks Deep Dive",
    description: "Build custom hooks and optimize performance",
    difficulty: "Hard",
    participants: 2,
    maxParticipants: 4,
    host: "Sarah Kim",
    timeLimit: "60 min",
    status: "waiting",
    tags: ["React", "Hooks", "Performance"]
  },
  {
    id: "3",
    title: "Database Design Sprint",
    description: "Design efficient database schemas",
    difficulty: "Easy",
    participants: 5,
    maxParticipants: 8,
    host: "Mike Johnson",
    timeLimit: "30 min",
    status: "in-progress",
    tags: ["SQL", "Database", "Schema"]
  },
  {
    id: "4",
    title: "API Security Challenge",
    description: "Implement secure authentication and authorization",
    difficulty: "Hard",
    participants: 1,
    maxParticipants: 4,
    host: "Emma Davis",
    timeLimit: "90 min",
    status: "waiting",
    tags: ["Security", "API", "Auth"]
  }
];

export const challenge = {
  title: "Array Algorithms Challenge",
  difficulty: "Medium",
  timeLimit: "45 min",
  description:
    "Solve a series of problems focused on array manipulation, sorting, and searching algorithms. Test your skills with challenges that require efficient solutions and optimal performance.",
  problem: `Problem 1: Two Sum
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9`
};

export const testResults = [
  {
    input: "[2,7,11,15], target=9",
    expected: "[0,1]",
    actual: "[0,1]",
    passed: true
  },
  {
    input: "[3,2,4], target=6",
    expected: "[1,2]",
    actual: "[1,2]",
    passed: true
  },
  {
    input: "[3,3], target=6",
    expected: "[0,1]",
    actual: "[0,0]",
    passed: false
  }
];

export const challengesOptions = [
  {
    value: "add-two-numbers",
    label: "Add Two Numbers"
  },
  {
    value: "longest-substring",
    label: "Longest Substring Without Repeating Characters"
  },
  {
    value: "median-of-two-sorted-arrays",
    label: "Median of Two Sorted Arrays"
  },
  {
    value: "longest-palindromic-substring",
    label: "Longest Palindromic Substring"
  },
  {
    value: "zigzag-conversion",
    label: "ZigZag Conversion"
  }
];

export const difficultyOptions = [
  { value: "easy", label: "Easy", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  },
  { value: "hard", label: "Hard", color: "bg-red-500/20 text-red-400 border-red-500/30" }
];

export const categoryOptions = [
  "Algorithms",
  "Data Structures",
  "Frontend",
  "Backend",
  "Database",
  "System Design",
  "Security",
  "Performance"
];

export const timeLimitOptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" }
];

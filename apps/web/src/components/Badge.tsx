import { ReactNode } from "react";

export const BadgeColors = {
  gray: "bg-gray-200 text-gray-800",
  red: "bg-red-200 text-red-800",
  yellow: "bg-yellow-200 text-yellow-800",
  green: "bg-green-200 text-green-800",
  blue: "bg-blue-200 text-blue-800",
  indigo: "bg-indigo-200 text-indigo-800",
  purple: "bg-purple-200 text-purple-800",
  pink: "bg-pink-200 text-pink-800",
};

interface BadgeProps {
  children: ReactNode;
  color?: keyof typeof BadgeColors;
}
export function Badge({ children, color = "gray" }: BadgeProps) {
  const colorClasses = BadgeColors[color];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${colorClasses}`}>
      {children}
    </span>
  );
}

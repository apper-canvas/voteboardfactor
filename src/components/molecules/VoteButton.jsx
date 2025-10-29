import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const VoteButton = ({ votes, userVoted, onVote, postId }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = () => {
    setIsAnimating(true);
    onVote(postId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleVote}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[60px]",
        userVoted 
          ? "bg-gradient-to-r from-accent to-pink-600 text-white shadow-lg" 
          : "bg-white border border-gray-200 text-gray-600 hover:border-accent hover:text-accent shadow-sm hover:shadow-md",
        isAnimating && "animate-scale-bounce"
      )}
    >
      <ApperIcon 
        name="ChevronUp" 
        className={cn(
          "w-4 h-4 transition-transform duration-200",
          isAnimating && "scale-125"
        )} 
      />
      <span className="text-sm font-semibold mt-1">{votes}</span>
    </button>
  );
};

export default VoteButton;
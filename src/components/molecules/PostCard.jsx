import { formatDistanceToNow } from "date-fns";
import VoteButton from "@/components/molecules/VoteButton";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const PostCard = ({ post, onVote, onPostClick }) => {
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-gray-100 p-6"
      onClick={() => onPostClick(post.Id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mr-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {truncateDescription(post.description)}
          </p>
        </div>
<div className="flex items-center space-x-3">
          <StatusBadge status={post.status} />
          <VoteButton
            votes={post.votes}
            userVoted={post.userVoted}
            onVote={(id, event) => {
              onVote(id);
              // Prevent post click when voting
              event?.stopPropagation();
            }}
            postId={post.Id}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <ApperIcon name="MessageCircle" className="w-4 h-4 mr-1" />
            <span>{post.commentCount} comments</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
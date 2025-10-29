import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const CommentItem = ({ comment, onReply, children }) => {
  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {comment.userName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {comment.userName}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment.text}
            </p>
          </div>
          {onReply && (
            <button
              onClick={() => onReply(comment.Id)}
              className="mt-2 text-xs text-gray-500 hover:text-primary transition-colors flex items-center"
            >
              <ApperIcon name="Reply" className="w-3 h-3 mr-1" />
              Reply
            </button>
          )}
        </div>
      </div>
      
      {/* Nested replies */}
      {children && (
        <div className="ml-11 space-y-3 border-l-2 border-gray-100 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
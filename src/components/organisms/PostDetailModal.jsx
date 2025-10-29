import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Textarea from "@/components/atoms/Textarea";
import VoteButton from "@/components/molecules/VoteButton";
import StatusBadge from "@/components/molecules/StatusBadge";
import CommentItem from "@/components/molecules/CommentItem";
import { commentService } from "@/services/api/commentService";
import { toast } from "react-toastify";

const PostDetailModal = ({ post, isOpen, onClose, onVote }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && post) {
      loadComments();
    }
  }, [isOpen, post]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await commentService.getByPostId(post.Id);
      setComments(data);
    } catch (error) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      await commentService.create({
        postId: post.Id,
        parentId: replyingTo,
        text: newComment.trim(),
        userName: "Current User"
      });
      
      setNewComment("");
      setReplyingTo(null);
      await loadComments();
      toast.success("Comment added successfully!");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const organizeComments = (comments) => {
    const topLevel = comments.filter(c => !c.parentId);
    const replies = comments.filter(c => c.parentId);
    
    return topLevel.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parentId === comment.Id)
    }));
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <VoteButton
              votes={post.votes}
              userVoted={post.userVoted}
              onVote={onVote}
              postId={post.Id}
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <StatusBadge status={post.status} />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </p>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-6">
                <Textarea
                  placeholder={replyingTo ? "Write a reply..." : "Share your thoughts..."}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="mb-3"
                />
                <div className="flex items-center justify-between">
                  <div>
                    {replyingTo && (
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                      >
                        <ApperIcon name="X" className="w-3 h-3 mr-1" />
                        Cancel Reply
                      </button>
                    )}
                  </div>
                  <Button type="submit" disabled={!newComment.trim() || submitting} size="small">
                    {submitting ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>

              {/* Comments List */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading comments...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {organizeComments(comments).map((comment) => (
                    <CommentItem
                      key={comment.Id}
                      comment={comment}
                      onReply={(id) => setReplyingTo(id)}
                    >
                      {comment.replies.map((reply) => (
                        <CommentItem
                          key={reply.Id}
                          comment={reply}
                        />
                      ))}
                    </CommentItem>
                  ))}
                </div>
              )}

              {comments.length === 0 && !loading && (
                <div className="text-center py-8">
                  <ApperIcon name="MessageCircle" className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
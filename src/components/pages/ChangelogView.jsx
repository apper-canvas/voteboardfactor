import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import Header from '@/components/organisms/Header';
import PostDetailModal from '@/components/organisms/PostDetailModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import StatusBadge from '@/components/molecules/StatusBadge';
import { postService } from '@/services/api/postService';
import { cn } from '@/utils/cn';

function ChangelogView() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    loadCompletedPosts();
  }, []);

  async function loadCompletedPosts() {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getCompleted();
      setPosts(data);
    } catch (err) {
      setError('Failed to load changelog. Please try again.');
      console.error('Error loading completed posts:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleVote(postId) {
    try {
      const updatedPost = await postService.toggleVote(postId);
      if (updatedPost) {
        setPosts(prevPosts =>
          prevPosts.map(p => p.Id === postId ? updatedPost : p)
        );
        toast.success(
          updatedPost.userVoted ? 'Vote added!' : 'Vote removed!',
          { autoClose: 2000 }
        );
      }
    } catch (err) {
      toast.error('Failed to update vote');
      console.error('Error toggling vote:', err);
    }
  }

  function handlePostClick(postId) {
    setSelectedPostId(postId);
  }

  function handleCloseModal() {
    setSelectedPostId(null);
    loadCompletedPosts();
  }

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadCompletedPosts} />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Changelog</h1>
          <p className="text-gray-600">
            Track all completed features and improvements
          </p>
        </div>

        {posts.length === 0 ? (
          <Empty
            title="No completed items yet"
            description="Completed feedback items will appear here"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div
                key={post.Id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePostClick(post.Id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <StatusBadge status={post.status} />
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(post.Id);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                      post.userVoted
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <ApperIcon 
                      name="ChevronUp" 
                      size={16}
                      className={post.userVoted ? "text-white" : "text-gray-600"}
                    />
                    <span>{post.votes}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.Id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <ApperIcon name="MessageSquare" size={16} className="text-gray-600" />
                    <span>{post.commentCount}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPostId && (
        <PostDetailModal
          postId={selectedPostId}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ChangelogView;
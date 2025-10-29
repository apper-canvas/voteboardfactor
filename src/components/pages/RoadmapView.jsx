import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import PostDetailModal from "@/components/organisms/PostDetailModal";
import SubmitPostModal from "@/components/organisms/SubmitPostModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import { postService } from "@/services/api/postService";
import { formatDistanceToNow } from "date-fns";

const RoadmapView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const statusColumns = [
    {
      status: "planned",
      title: "Planned",
      description: "Features we're planning to build",
      icon: "Calendar",
      color: "bg-blue-50 border-blue-200"
    },
    {
      status: "in-progress", 
      title: "In Progress",
      description: "Currently being developed",
      icon: "Zap",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      status: "completed",
      title: "Completed",
      description: "Recently shipped features",
      icon: "CheckCircle",
      color: "bg-green-50 border-green-200"
    }
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await postService.getAll();
      // Filter to only show posts with roadmap-relevant statuses
      const roadmapPosts = data.filter(post => 
        ["planned", "in-progress", "completed"].includes(post.status)
      );
      setPosts(roadmapPosts);
    } catch (err) {
      setError("Failed to load roadmap data");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (postId) => {
    try {
      const updatedPost = await postService.toggleVote(postId);
      if (updatedPost) {
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.Id === postId ? updatedPost : post
          )
        );
        
        if (selectedPost && selectedPost.Id === postId) {
          setSelectedPost(updatedPost);
        }
        
        toast.success(updatedPost.userVoted ? "Vote added!" : "Vote removed!");
      }
    } catch (error) {
      toast.error("Failed to update vote");
    }
  };

  const handlePostClick = (postId) => {
    const post = posts.find(p => p.Id === postId);
    if (post) {
      setSelectedPost(post);
      setShowPostDetail(true);
    }
  };

  const getPostsByStatus = (status) => {
    return posts.filter(post => post.status === status);
  };

  const handlePostCreated = (newPost) => {
    if (["planned", "in-progress", "completed"].includes(newPost.status)) {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSubmitClick={() => setShowSubmitModal(true)}
        onSearch={() => {}} // Roadmap doesn't need search for now
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Roadmap</h1>
          <p className="text-gray-600">
            Track the progress of feature requests from planning to completion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {statusColumns.map((column) => {
            const columnPosts = getPostsByStatus(column.status);
            
            return (
              <div key={column.status} className="space-y-4">
                <div className={`rounded-lg border-2 p-4 ${column.color}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <ApperIcon name={column.icon} className="w-6 h-6 text-gray-700" />
                    <h2 className="text-xl font-bold text-gray-900">{column.title}</h2>
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                      {columnPosts.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{column.description}</p>
                </div>

                <div className="space-y-3">
                  {columnPosts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ApperIcon name="Package" className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No items yet</p>
                    </div>
                  ) : (
                    columnPosts
                      .sort((a, b) => b.votes - a.votes)
                      .map((post) => (
                        <div
                          key={post.Id}
                          onClick={() => handlePostClick(post.Id)}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                              {post.title}
                            </h3>
                            <StatusBadge status={post.status} />
                          </div>
                          
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                            {post.description.substring(0, 100)}
                            {post.description.length > 100 ? "..." : ""}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <ApperIcon name="ChevronUp" className="w-3 h-3 mr-1" />
                                {post.votes}
                              </div>
                              <div className="flex items-center">
                                <ApperIcon name="MessageCircle" className="w-3 h-3 mr-1" />
                                {post.commentCount}
                              </div>
                            </div>
                            <span>
                              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PostDetailModal
        post={selectedPost}
        isOpen={showPostDetail}
        onClose={() => setShowPostDetail(false)}
        onVote={handleVote}
      />

      <SubmitPostModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onPostCreated={handlePostCreated}
        currentBoard="feature-requests"
      />
    </div>
  );
};

export default RoadmapView;
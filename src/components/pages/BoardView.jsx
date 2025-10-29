import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import PostGrid from "@/components/organisms/PostGrid";
import PostDetailModal from "@/components/organisms/PostDetailModal";
import SubmitPostModal from "@/components/organisms/SubmitPostModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { postService } from "@/services/api/postService";

const BoardView = () => {
  const { board = "feature-requests" } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "", sortBy: "recent" });

  useEffect(() => {
    loadPosts();
  }, [board]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [posts, filters, searchQuery]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await postService.getByBoard(board);
      setPosts(data);
    } catch (err) {
      setError("Failed to load feedback posts");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(post => post.status === filters.status);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "votes":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "comments":
        filtered.sort((a, b) => b.commentCount - a.commentCount);
        break;
      case "recent":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredPosts(filtered);
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

  const handlePostClick = async (postId) => {
    const post = posts.find(p => p.Id === postId);
    if (post) {
      setSelectedPost(post);
      setShowPostDetail(true);
    }
  };

  const handlePostCreated = (newPost) => {
    if (newPost.board === board) {
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPosts} />;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSubmitClick={() => setShowSubmitModal(true)}
        onSearch={handleSearch}
      />
      
      <div className="max-w-7xl mx-auto flex">
        <FilterSidebar 
          onFilter={handleFilter}
          currentBoard={board}
        />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">
              {board.replace("-", " ")}
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found
            </p>
          </div>
          
          <PostGrid 
            posts={filteredPosts}
            onVote={handleVote}
            onPostClick={handlePostClick}
            onSubmitClick={() => setShowSubmitModal(true)}
          />
        </main>
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
        currentBoard={board}
      />
    </div>
  );
};

export default BoardView;
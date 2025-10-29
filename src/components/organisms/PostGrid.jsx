import PostCard from "@/components/molecules/PostCard";
import Empty from "@/components/ui/Empty";

const PostGrid = ({ posts, onVote, onPostClick, onSubmitClick }) => {
  if (!posts || posts.length === 0) {
    return (
      <Empty 
        title="No feedback found"
        description="Be the first to share your ideas and help shape the product!"
        actionText="Submit Feedback"
        onAction={onSubmitClick}
      />
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.Id}
          post={post}
          onVote={onVote}
          onPostClick={onPostClick}
        />
      ))}
    </div>
  );
};

export default PostGrid;
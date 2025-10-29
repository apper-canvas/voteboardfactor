import postsData from "@/services/mockData/posts.json";

let posts = [...postsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const postService = {
  async getAll() {
    await delay(300);
    return posts.map(post => ({ ...post }));
  },

  async getById(id) {
    await delay(200);
    const post = posts.find(p => p.Id === parseInt(id));
    return post ? { ...post } : null;
  },

  async getByBoard(board) {
    await delay(300);
    return posts
      .filter(p => p.board === board)
      .map(post => ({ ...post }));
  },

  async create(postData) {
    await delay(400);
    const newId = Math.max(...posts.map(p => p.Id)) + 1;
    const newPost = {
      Id: newId,
      title: postData.title,
      description: postData.description,
      board: postData.board,
      status: "under-review",
      votes: 0,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      userVoted: false
    };
    posts.unshift(newPost);
    return { ...newPost };
  },

  async toggleVote(id) {
    await delay(200);
    const postIndex = posts.findIndex(p => p.Id === parseInt(id));
    if (postIndex !== -1) {
      const post = posts[postIndex];
      if (post.userVoted) {
        post.votes -= 1;
        post.userVoted = false;
      } else {
        post.votes += 1;
        post.userVoted = true;
      }
      return { ...post };
    }
    return null;
  },

  async updateStatus(id, status) {
    await delay(300);
    const postIndex = posts.findIndex(p => p.Id === parseInt(id));
    if (postIndex !== -1) {
      posts[postIndex].status = status;
      return { ...posts[postIndex] };
    }
    return null;
  },

  async search(query, board = null, status = null) {
    await delay(300);
    let filtered = [...posts];
    
    if (board) {
      filtered = filtered.filter(p => p.board === board);
    }
    
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
    
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
}
    
    return filtered.map(post => ({ ...post }));
  },

  async getCompleted() {
    await delay(300);
    return posts
      .filter(p => p.status === "completed")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(post => ({ ...post }));
  }
};
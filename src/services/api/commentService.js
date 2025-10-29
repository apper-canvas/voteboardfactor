import commentsData from "@/services/mockData/comments.json";

let comments = [...commentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const commentService = {
  async getByPostId(postId) {
    await delay(200);
    return comments
      .filter(c => c.postId === parseInt(postId))
      .map(comment => ({ ...comment }));
  },

  async create(commentData) {
    await delay(300);
    const newId = Math.max(...comments.map(c => c.Id)) + 1;
    const newComment = {
      Id: newId,
      postId: parseInt(commentData.postId),
      parentId: commentData.parentId ? parseInt(commentData.parentId) : null,
      text: commentData.text,
      userName: commentData.userName || "Anonymous User",
      createdAt: new Date().toISOString()
    };
    comments.push(newComment);
    return { ...newComment };
  },

  async getAll() {
    await delay(250);
    return comments.map(comment => ({ ...comment }));
  }
};
import boardsData from "@/services/mockData/boards.json";

let boards = [...boardsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const boardService = {
  async getAll() {
    await delay(200);
    return boards.map(board => ({ ...board }));
  },

  async getById(id) {
    await delay(150);
    const board = boards.find(b => b.Id === parseInt(id));
    return board ? { ...board } : null;
  },

  async getBySlug(slug) {
    await delay(150);
    const slugMap = {
      "feature-requests": 1,
      "bug-reports": 2,
      "general": 3
    };
    const boardId = slugMap[slug];
    if (boardId) {
      const board = boards.find(b => b.Id === boardId);
      return board ? { ...board } : null;
    }
    return null;
  }
};
import Post from "../models/Post.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [postCount, userCount, categoryCount] = await Promise.all([
      Post.countDocuments(),
      User.countDocuments(),
      Category.countDocuments(),
    ]);

    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role createdAt");

    res.json({
      stats: {
        posts: postCount,
        users: userCount,
        categories: categoryCount,
      },
      latestUsers,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name")
      .select("title createdAt author status");

    res.json({ posts });
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

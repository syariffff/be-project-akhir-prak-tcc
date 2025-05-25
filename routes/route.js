import express from "express";
import {
  createReview,
  getReview,
  updateReview,
  deleteReview,
} from "../controllers/ReviewController.js";
import {
  Register,
  Login,
  refreshToken,
  logout,
} from "../controllers/UserController.js";
import {
  createAnime,
  getAnime,
  updateAnime,
  deleteAnime,
} from "../controllers/AnimeController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

router.get("/review", verifyToken, getReview);
router.get("/review/:id", verifyToken, getReview);
router.post("/add-review", verifyToken, createReview);
router.put("/update-review/:id", verifyToken, updateReview);
router.delete("/delete-review/:id", verifyToken, deleteReview);

router.get("/anime", verifyToken, getAnime);
router.get("/anime/:id", verifyToken, getAnime);
router.post("/add-anime", verifyToken,createAnime);
router.put("/update-anime/:id", verifyToken, updateAnime);
router.delete("/delete-anime/:id", verifyToken, deleteAnime);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;

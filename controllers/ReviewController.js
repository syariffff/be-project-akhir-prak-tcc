import Review from "../models/ReviewModel.js";

// Create Review
export const createReview = async (req, res) => {
  const { rating, comment, animeId } = req.body;  // tambahkan animeId agar review terkait anime tertentu
  const userId = req.user.id;

  // Validasi input sederhana
  if (
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    !comment ||
    comment.trim().length < 5 ||
    !animeId
  ) {
    return res.status(400).json({ message: "Input review tidak valid" });
  }

  try {
    const newReview = await Review.create({
      rating,
      comment: comment.trim(),
      userId,
      animeId,
    });

    res.status(201).json({
      message: "Review berhasil dibuat",
      data: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  if (
    (rating && (typeof rating !== "number" || rating < 1 || rating > 5)) ||
    (comment && comment.trim().length < 5)
  ) {
    return res.status(400).json({ message: "Input update review tidak valid" });
  }

  try {
    // Cari review dan pastikan milik user yang login
    const review = await Review.findOne({ where: { id, userId } });
    if (!review) {
      return res.status(404).json({ message: "Review tidak ditemukan atau bukan milik Anda" });
    }

    // Update field yang ada (partial update)
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment.trim();

    await review.save();

    res.status(200).json({
      message: "Review berhasil diupdate",
      data: review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getReview = async (req, res) => {
  const id = req.user.id;

  try {
    const review = await Review.findAll({ where: { userId: id } });

    res.status(200).json({
      message: "Review berhasil diambil",
      userId: id,
      data: review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  console.log("ID NOTES = ", id);

  const userId = req.user.id;
  try {
    const review = await Review.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Review berhasil dihapus",
      userId,
      data: review,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
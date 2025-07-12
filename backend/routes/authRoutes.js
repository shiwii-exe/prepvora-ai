const express = require('express');
const { registerUser, loginUser, getUserProfile  } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

//Auth Routes

router.post("/register", registerUser); //Register User

router.post("/login", loginUser); 

router.get("/profile",protect, getUserProfile); 

router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const profileImageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
}`;
res.status(200).json({imageUrl : profileImageUrl});
});

module.exports = router;
import express from "express";
import protect from "../middleware/authentiationMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatController.js";
const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupRemove").put(protect, removeFromGroup);
router.route("/addToGroup").put(protect, addToGroup);

export default router;

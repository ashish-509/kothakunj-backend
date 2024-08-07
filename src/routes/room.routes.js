import express from "express";
import {
  createRoomHandler,
  getAllRoomsHandler,
  getRoomByIdHandler,
  updateRoomByIdHandler,
  deleteRoomByIdHandler,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT,  createRoomHandler); // add verifyJWT after adding login feature
router.get("/", getAllRoomsHandler);
router.get("/:id", getRoomByIdHandler);
router.put("/:id", verifyJWT, updateRoomByIdHandler);
router.delete("/:id", verifyJWT, deleteRoomByIdHandler);

export default router;


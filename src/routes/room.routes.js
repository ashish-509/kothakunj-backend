// import express from "express";
// import {
//   createRoomHandler,
//   getAllRoomsHandler,
//   getRoomByIdHandler,
//   updateRoomByIdHandler,
//   deleteRoomByIdHandler,
// } from "../controllers/room.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.post("/rooms", verifyJWT, createRoomHandler);

// router.get("/rooms", getAllRoomsHandler);

// router.get("/rooms/:id", getRoomByIdHandler);

// router.put("/rooms/:id", verifyJWT, updateRoomByIdHandler);

// router.delete("/rooms/:id", verifyJWT, deleteRoomByIdHandler);

// export default router;

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

router.post("/", verifyJWT, createRoomHandler);
router.get("/", getAllRoomsHandler);
router.get("/:id", getRoomByIdHandler);
router.put("/:id", verifyJWT, updateRoomByIdHandler);
router.delete("/:id", verifyJWT, deleteRoomByIdHandler);

export default router;


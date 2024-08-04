import express from "express";
import {
  createFlatHandler,
  getAllFlatsHandler,
  getFlatByIdHandler,
  updateFlatHandler,
  deleteFlatHandler,
} from "../controllers/flat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/flats", verifyJWT, createFlatHandler);

router.get("/flats", getAllFlatsHandler);

router.get("/flats/:id", getFlatByIdHandler);

router.put("/flats/:id", verifyJWT, updateFlatHandler);

router.delete("/flats/:id", verifyJWT, deleteFlatHandler);

export default router;

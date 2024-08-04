import express from "express";
import {
  createLocationHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  updateLocationByIdHandler,
  deleteLocationByIdHandler,
  getLocationsByCityHandler
} from "../controllers/location.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/locations", verifyJWT, createLocationHandler);

router.get("/locations", getAllLocationsHandler);

router.get("/locations/:id", getLocationByIdHandler);

router.put("/locations/:id", verifyJWT, updateLocationByIdHandler);

router.delete("/locations/:id", verifyJWT, deleteLocationByIdHandler);

router.get("/locations/city/:city", getLocationsByCityHandler);

export default router;

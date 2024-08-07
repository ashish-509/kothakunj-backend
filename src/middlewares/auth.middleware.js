import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { getUserById } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve the token from the request cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token);

    if (!token) {
      console.log("Not authorized: No token provided");
      throw new ApiError(401, "Unauthorized request.");
    }

    // Verify the token using the secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    // Get user from the database using decoded token's _id
    const user = await getUserById(decodedToken._id);

    if (!user) {
      console.log("Invalid Access Token: User not found");
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error during token verification:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

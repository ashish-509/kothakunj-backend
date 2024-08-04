import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import  { getUserById } from "../models/user.model.js";

import jwt from 'jsonwebtoken'
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Retrieve the token from the request cookies or Authorization header
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', "");
        console.log(token);
        if (!token) {
            console.log('Not authorized');
            throw new ApiError(401, "Unauthorized request.");
        }

        // // Verify the token using the secret
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await getUserById(decodedToken._id);


        if (!user) {
            throw new ApiError(401, 'Invalid Access Token');
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
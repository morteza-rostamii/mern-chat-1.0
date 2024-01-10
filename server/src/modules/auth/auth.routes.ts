import express from "express";
import authController from "./auth.controller";
import { authenticateToken } from "../../utils/jwt";

const router = express.Router();

// POST: /auth/register
router
  .route('/register')
  .post(authController.register);

// POST: /auth/login
// magic-link redirects to this route
router
  .route('/login')
  .post(authController.login);

// POST: /auth/verify_token
router
  .route('/check-token')
  .post(authController.checkExpiry)

// POST: /auth/search-users
router
  .route('/search-users')
  .post(authenticateToken, authController.searchUsers);

// add friends
router
  .route('/add-friend')
  .post(authenticateToken, authController.addFriend)

// get all friends
router
  .route('/friends')
  .post(authenticateToken, authController.getFriends)

// /auth/logout
router
  .route('/logout')
  .post(authenticateToken, authController.logout);

export default router 
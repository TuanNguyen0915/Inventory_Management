import { Router } from "express";
import * as UserCtrl from "../controllers/userCtrl.js";
import { checkAuth } from "../middleWare/authMiddleware.js";

const router = Router()
router.post('/register', UserCtrl.register)
router.post('/login', UserCtrl.login)
router.get('/logout', UserCtrl.logout)
router.get('/user-details',checkAuth, UserCtrl.userDetails)
router.put('/update-user', checkAuth, UserCtrl.updateUser)
router.put('/change-password', checkAuth, UserCtrl.changePassword)
export {router}

import { Router } from "express";
import * as UserCtrl from "../controllers/userCtrl.js";


const router = Router()
router.post('/register', UserCtrl.register)
router.post('/login', UserCtrl.login)
router.get('/logout', UserCtrl.logout)
export {router}
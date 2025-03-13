import { Router } from "express";
import { getUsers } from "../Controllers/userControllers";

const router = Router();

router.get("/", getUsers);

export default router;

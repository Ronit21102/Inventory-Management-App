import { Router } from "express";
import { getDashboardMetrics } from "../Controllers/dashboardControllers";


const router = Router();

router.get("/", getDashboardMetrics);



export default router;
import { Request, Response } from "express";
import os from "os";

export class HealthController {
  check(req: Request, res: Response) {
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
      memoryUsage: process.memoryUsage(),
      cpuLoad: os.loadavg(),
    });
  }
}

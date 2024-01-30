import { Request, Response } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: Function): void => {
    console.log("logger middleware");
    next();
}
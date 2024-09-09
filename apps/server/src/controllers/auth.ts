import db from "@/config/prisma";
import bcryptjs from "bcryptjs";
import { ReasonResponse } from "@/middlewares/reason_response";
import createResponse from "@/middlewares/response";
import { StatusCodes } from "@/middlewares/status_codes";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import generateToken from "../utils/generate_tokens";
import jwt from "jsonwebtoken";

interface RegisterProps {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: RegisterProps = req.body

    let user = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: body,
      });
    } else {
      user = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: body.name,
          oauth_id: body.oauth_id,
          provider: body.provider,
          image: body.image,
        }
      });
    }

    const JWTPayload = {
      name: body.name,
      email: body.email,
      id: user.id,
    };

    const token = jwt.sign(JWTPayload, process.env.JWT_SECRET!, {
      expiresIn: "365d",
    });

      return createResponse({
        code: StatusCodes.OK,
          message: {
          ...user,
            token: `Bearer ${token}`,
          },
        res
      });
  } catch (error) {
    next(error);
  }
};

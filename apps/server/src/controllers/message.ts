import db from "@/config/prisma";
import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { getReceiverSocketId, io } from "../socket";
import createResponse from "@/middlewares/response";
import { StatusCodes } from "@/middlewares/status_codes";
import { ReasonResponse } from "@/middlewares/reason_response";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, id }: { message: string; id: string } = req.body;
    const receiverId = req.query["id"]?.valueOf() as string;
    const senderId = id;

    let chat = await db.chat.findFirst({
      where: {
        members: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    // the very first message is being sent, that's why we need to create a new conversation
    if (!chat) {
      chat = await db.chat.create({
        data: {
          userId: senderId,
          members: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await db.message.create({
      data: {
        userId: senderId,
        content: message,
        chatId: chat.id,
      },
    });

    if (newMessage) {
      chat = await db.chat.update({
        where: {
          id: chat.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    // Socket io will go here
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return createResponse({
      code: StatusCodes.CREATED,
      message:ReasonResponse.CREATED,
      res
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const receiverId = req.query["id"]?.valueOf() as string;
    const senderId: string = req.body.id;

    const skip = req.query["skip"]?.valueOf() as number ?? 0
    const take = req.query["take"]?.valueOf() as number ?? 10

    const chat = await db.chat.findFirst({
      where: {
        members: {
          hasEvery: [senderId, receiverId],
        },
      },
      include: {
        messages: {
          skip,
          take,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!chat) {
      return createResponse({
        code: StatusCodes.CREATED,
        message: [],
        res
      });
    }

    return createResponse({
      code: StatusCodes.OK,
      message: chat.messages,
      res
    });
  } catch (error) {
    next(error);
  }
};

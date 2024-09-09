import { Response } from "express";

const createResponse = ({
    code,
    message,
    res,
                        }: {
  code: number,
  message: string | object,
  res: Response
}) => {
  return res.status(code).json({ message });
};

export default createResponse;

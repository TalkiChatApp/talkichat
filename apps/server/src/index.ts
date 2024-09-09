import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import { app, server } from "@/socket";
import catchErrors from "@/middlewares/errors";

import authRoutes from "@/routes/auth";
import chatRoutes from "@/routes/chat";
import contactRoutes from "@/routes/contact";

const port = process.env.PORT || 8080;

/*
  -- parses incoming requests with JSON payloads --
*/
app.use(express.json());

app.use(morgan("dev"));

/*
  -- routes --
*/
app.use("/register", authRoutes);
app.use("/chats", chatRoutes);
app.use("/contacts", contactRoutes);

/*
  -- error handler middleware --
*/
app.use(catchErrors);

/*
  -- server setup --
*/
server.listen(port, () => {
  console.log(chalk.bold.bgGreen(`http://localhost:${port}`));
});

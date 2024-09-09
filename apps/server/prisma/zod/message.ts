import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteChat, relatedChatSchema } from "./index"

export const messageSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  userId: z.string(),
  chatId: z.string(),
  content: z.string(),
  images: z.string().array(),
  videos: z.string().array(),
  audio: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMessage extends z.infer<typeof messageSchema> {
  user: CompleteUser
  chat: CompleteChat
}

/**
 * relatedMessageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedMessageSchema: z.ZodSchema<CompleteMessage> = z.lazy(() => messageSchema.extend({
  user: relatedUserSchema,
  chat: relatedChatSchema,
}))

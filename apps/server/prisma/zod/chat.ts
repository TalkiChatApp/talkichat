import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteMessage, relatedMessageSchema } from "./index"

export const chatSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  userId: z.string(),
  members: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChat extends z.infer<typeof chatSchema> {
  user: CompleteUser
  messages: CompleteMessage[]
}

/**
 * relatedChatSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedChatSchema: z.ZodSchema<CompleteChat> = z.lazy(() => chatSchema.extend({
  user: relatedUserSchema,
  messages: relatedMessageSchema.array(),
}))

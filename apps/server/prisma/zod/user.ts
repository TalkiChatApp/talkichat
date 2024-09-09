import * as z from "zod"
import { CompleteChat, relatedChatSchema, CompleteMessage, relatedMessageSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  username: z.string().nullish(),
  phone: z.string().nullish(),
  image: z.string().nullish(),
  provider: z.string().nullish(),
  oauth_id: z.string().nullish(),
  verified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  chats: CompleteChat[]
  messages: CompleteMessage[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  chats: relatedChatSchema.array(),
  messages: relatedMessageSchema.array(),
}))

import * as z from "zod"

export const contactSchema = z.object({
  id: z.string(),
  publicId: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

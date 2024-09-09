import { registerSchema } from "@/lib/validations/auth";

export type Direction = "rtl" | "ltr";

export type AuthFormSchema = z.infer<typeof registerSchema>;

export type RegisterStatus = "success" | "error";

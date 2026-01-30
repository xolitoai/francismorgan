import { z } from "astro/zod";

export const contactSchema = z.object({
  name: z.string().nonempty({ message: "Nombre requerido" }),
  email: z
    .string()
    .email({ message: "Correo electronico invalido" })
    .nonempty({ message: "Correo electronico requerido" }),
  website: z.string().optional(),
  company: z.string().optional(),
  message: z.string().superRefine((arg, ctx) => {
    const wordCount = arg.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount <= 5) {
      ctx.addIssue({
        code: "custom",
        message: "El mensaje debe de tener al menos 5 palabras",
      });
      return z.NEVER;
    }
  }),
});

export type ContactSchema = z.infer<typeof contactSchema>;

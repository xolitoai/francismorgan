import { defineAction } from "astro:actions";
import { contactSchema } from "../lib/zod/contact.schema";
import { resend } from "../lib/resend/client";
import { ContactLeadEmail } from "../templates/lead.template";

const email = import.meta.env.RESEND_LEAD_EMAIL;

export const server = {
  lead: defineAction({
    input: contactSchema,
    async handler(input) {
      await resend.emails.send({
        to: [email],
        from: email,
        subject: "New Lead @francismorgan.mx",
        react: ContactLeadEmail(input),
      });
    },
  }),
};

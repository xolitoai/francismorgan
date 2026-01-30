import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Tailwind,
  Head,
} from "@react-email/components";
import type { ContactSchema } from "../lib/zod/contact.schema";

type ContactLeadEmailProps = ContactSchema;

export function ContactLeadEmail({
  name,
  email,
  company,
  website,
  message,
}: ContactLeadEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans">
          <Container className="mx-auto max-w-xl bg-white px-8 py-10">
            {/* <Container className="mx-auto my-12 max-w-xl rounded-xl bg-white px-8 py-10 shadow-sm"> */}
            {/* <Heading className="relative mb-6 text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900">
              Nuevo lead desde el sitio
            </Heading> */}
            <Heading className="text-xl font-semibold tracking-tight text-neutral-900">
              Nuevo lead desde el sitio
            </Heading>

            <Text className="text-sm text-neutral-500">
              Se recibió un nuevo mensaje de contacto con la siguiente
              información:
            </Text>

            <div className="mt-6 space-y-2">
              <Text className="text-neutral-900">
                <span className="font-semibold">Nombre:</span> {name}
              </Text>

              <Text className="text-neutral-900">
                <span className="font-semibold">Email:</span> {email}
              </Text>

              {company && (
                <Text className="text-neutral-900">
                  <span className="font-semibold">Compañía:</span> {company}
                </Text>
              )}

              {website && (
                <Text className="text-neutral-900">
                  <span className="font-semibold">Sitio web:</span> {website}
                </Text>
              )}
            </div>

            <Text className="block font-semibold text-neutral-900">
              Mensaje
            </Text>

            <Text className="whitespace-pre-line leading-relaxed text-neutral-600">
              {message}
            </Text>

            <Text className="mt-10 text-xs text-neutral-500">
              Enviado desde el formulario de contacto de francismorgan.mx
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

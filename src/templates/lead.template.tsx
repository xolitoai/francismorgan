import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Tailwind,
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
      <Tailwind>
        <Body className="font-sans">
          <Container className="mx-auto my-12 max-w-xl rounded-xl bg-white px-8 py-10 shadow-sm">
            {/* Title with indigo accent (WorkTabs-inspired) */}
            <div className="relative mb-6 pl-4">
              <div className="absolute left-0 top-1 h-5 w-1 bg-indigo-600" />
              <Heading className="relative pl-4 text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-indigo-600">
                <span>Nuevo lead desde el sitio</span>
              </Heading>
            </div>

            {/* Lead meta */}
            <Text className="text-sm text-neutral-500">
              Se recibió un nuevo mensaje de contacto con la siguiente
              información:
            </Text>

            <div className="mt-6 space-y-2">
              <Text className="text-neutral-900">
                <strong>Nombre:</strong> {name}
              </Text>

              <Text className="text-neutral-900">
                <strong>Email:</strong> {email}
              </Text>

              {company && (
                <Text className="text-neutral-900">
                  <strong>Compañía:</strong> {company}
                </Text>
              )}

              {website && (
                <Text className="text-neutral-900">
                  <strong>Sitio web:</strong> {website}
                </Text>
              )}
            </div>

            {/* Message */}
            <div className="mt-8">
              <Heading className="text-base font-semibold text-neutral-900">
                Mensaje
              </Heading>

              <Text className="mt-2 whitespace-pre-line leading-relaxed text-neutral-600">
                {message}
              </Text>
            </div>

            <Text className="mt-10 text-xs text-neutral-400">
              Enviado desde el formulario de contacto de francismorgan.mx
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

import { useState, type FormEvent } from "react";
import clsx from "clsx";
import {
  Modal,
  ModalOverlay,
  Dialog,
  Heading,
  Button,
  TextField,
  Input,
  TextArea,
} from "react-aria-components";

type Variant = "primary" | "secondary" | "link";
type Size = "small" | "base" | "large";

type Props = {
  variant?: Variant;
  size?: Size;
};

export default function ContactModal({
  variant = "primary",
  size = "base",
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    await fetch("/api/contact", { method: "POST", body: formData });

    setLoading(false);
    setOpen(false);
  }

  const triggerClasses = clsx(
    "cursor-pointer transition",
    {
      "inline-block rounded-xl bg-indigo-600 text-white hover:bg-indigo-500":
        variant === "primary",

      "inline-block text-neutral-900 underline underline-offset-4 hover:text-neutral-700":
        variant === "secondary",

      "inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-500":
        variant === "link",
    },
    {
      /* primary sizes */
      "px-4 py-2 text-sm": variant === "primary" && size === "small",
      "px-5 py-2.5 text-base": variant === "primary" && size === "base",
      "px-7 py-3.5 text-lg": variant === "primary" && size === "large",

      /* non-primary sizes */
      "text-sm": variant !== "primary" && size !== "large",
      "text-base": variant !== "primary" && size === "large",
    },
  );

  return (
    <>
      <Button onPress={() => setOpen(true)} className={triggerClasses}>
        Contáctanos
      </Button>

      <ModalOverlay
        isOpen={open}
        onOpenChange={setOpen}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <Modal className="w-full max-w-md outline-none">
          <Dialog className="rounded-xl bg-white p-6 shadow outline-none">
            <Heading className="text-lg font-semibold text-neutral-900">
              Hablemos de tu proyecto
            </Heading>

            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <TextField name="name" isRequired>
                <Input
                  placeholder="Nombre"
                  className="w-full rounded-lg border px-3 py-2"
                />
              </TextField>

              <TextField name="email" type="email" isRequired>
                <Input
                  placeholder="Email"
                  className="w-full rounded-lg border px-3 py-2"
                />
              </TextField>

              <TextField name="message" isRequired>
                <TextArea
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto"
                  className="w-full rounded-lg border px-3 py-2"
                />
              </TextField>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  onPress={() => setOpen(false)}
                  className="text-neutral-600"
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  isDisabled={loading}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {loading ? "Enviando…" : "Enviar"}
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}

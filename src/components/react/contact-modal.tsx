import { useState } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
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

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactModal({
  variant = "primary",
  size = "base",
}: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    await fetch("/api/contact", {
      method: "POST",
      body: new URLSearchParams(data),
    });

    reset();
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
      "px-4 py-2 text-sm": variant === "primary" && size === "small",
      "px-5 py-2.5 text-base": variant === "primary" && size === "base",
      "px-7 py-3.5 text-lg": variant === "primary" && size === "large",

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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
              noValidate
            >
              <div>
                <Input
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Nombre"
                  className={clsx(
                    "w-full rounded-lg border px-3 py-2",
                    errors.name && "border-red-500",
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email inválido",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className={clsx(
                    "w-full rounded-lg border px-3 py-2",
                    errors.email && "border-red-500",
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <TextArea
                  {...register("message", {
                    required: "Cuéntanos sobre tu proyecto",
                  })}
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto"
                  className={clsx(
                    "w-full rounded-lg border px-3 py-2",
                    errors.message && "border-red-500",
                  )}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

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
                  isDisabled={isSubmitting}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando…" : "Enviar"}
                </Button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}

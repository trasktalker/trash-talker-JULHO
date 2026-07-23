"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// We can also use server actions in client components.
import { signUp } from "@/actions/signup";
import {
  type FormEventHandler,
  useActionState,
  useCallback,
  useRef,
} from "react";
import { Loader2Icon } from "lucide-react";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUp, {});

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const validatePasswordConfirmation = useCallback<
    FormEventHandler<HTMLInputElement>
  >((ev) => {
    confirmPasswordInputRef.current?.setCustomValidity("");
    if (passwordInputRef.current?.value !== ev.currentTarget.value) {
      confirmPasswordInputRef.current?.setCustomValidity(
        "Passwords do not match",
      );
    }
  }, []);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Trash Talker</CardTitle>
              <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required
                          ref={passwordInputRef}
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="confirm-password">
                          Confirm Password
                        </FieldLabel>
                        <Input
                          id="confirm-password"
                          type="password"
                          required
                          minLength={8}
                          onInput={validatePasswordConfirmation}
                          ref={confirmPasswordInputRef}
                        />
                      </Field>
                    </div>
                  </Field>
                  {state?.error && (
                    <FieldError
                      className="text-center"
                      errors={state.error.split("\n").map((err) => ({
                        message: err,
                      }))}
                    />
                  )}
                  <Field className="pt-2">
                    <Button type="submit" disabled={pending} className="w-full">
                      {pending && (
                        <Loader2Icon className="size-4 animate-spin mr-2" />
                      )}
                      Create Account
                    </Button>
                  </Field>

                  <div className="text-sm text-muted-foreground text-center mt-2">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Login
                    </Link>
                  </div>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <div className="text-xs text-muted-foreground text-center px-6">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

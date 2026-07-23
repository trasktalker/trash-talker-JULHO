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
import { login } from "@/actions/login";
import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Trash Talker</CardTitle>
              <CardDescription>Login to your account</CardDescription>
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
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
                      Login
                    </Button>
                  </Field>

                  <div className="text-sm text-muted-foreground text-center mt-2">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
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

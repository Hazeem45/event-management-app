import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/ui/InputFloatingLabel";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const Register = () => {
  const {
    isPasswordVisible,
    handleChangeVisiblePassword,
    handleRegister,
    isPendingRegister,
    form,
  } = useRegister();
  const err = form.formState.errors;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="logo"
          width={1024}
          height={1024}
          loading="eager"
          className="w-2/3 lg:w-full"
        />
      </div>
      <Card className="gap-4 p-8">
        <CardHeader className="gap-0 px-0">
          <CardTitle className="text-primary text-2xl font-bold">
            Create account
          </CardTitle>
          <p className="text-sm">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary/90 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </CardHeader>

        {err.root && (
          <p className="text-destructive font-medium">{err?.root?.message}</p>
        )}

        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className={cn(
                "flex w-80 flex-col",
                Object.keys(err).length > 0 ? "gap-2" : "gap-4",
              )}
            >
              {/* fullName */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Fullname"
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Username"
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Email"
                        type="email"
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Password"
                        type={isPasswordVisible.password ? "text" : "password"}
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        endContent={
                          <Button
                            type="button"
                            className="cursor-pointer p-0! hover:bg-transparent hover:text-inherit"
                            variant={"ghost"}
                            onClick={() =>
                              handleChangeVisiblePassword("password")
                            }
                          >
                            {isPasswordVisible.password ? (
                              <FaEye className="size-5 text-[#A1A1AA]" />
                            ) : (
                              <FaEyeSlash className="size-5 text-[#A1A1AA]" />
                            )}
                          </Button>
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Confirm password"
                        type={
                          isPasswordVisible.confirmPassword
                            ? "text"
                            : "password"
                        }
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        endContent={
                          <Button
                            type="button"
                            className="cursor-pointer p-0! hover:bg-transparent hover:text-inherit"
                            variant={"ghost"}
                            onClick={() =>
                              handleChangeVisiblePassword("confirmPassword")
                            }
                          >
                            {isPasswordVisible.confirmPassword ? (
                              <FaEye className="size-5 text-[#A1A1AA]" />
                            ) : (
                              <FaEyeSlash className="size-5 text-[#A1A1AA]" />
                            )}
                          </Button>
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPendingRegister}
                type="submit"
                className="disabled:bg-primary/90 h-12 w-full cursor-pointer rounded-xl text-base disabled:cursor-none"
              >
                {isPendingRegister ? (
                  <>
                    <Spinner className="size-5 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

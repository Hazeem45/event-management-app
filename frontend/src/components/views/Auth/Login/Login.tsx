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
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const Login = () => {
  const {
    isPasswordVisible,
    toggleVisibilityPassword,
    handleLogin,
    isPendingLogin,
    form,
  } = useLogin();
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
            Wellcome Back
          </CardTitle>
          <p className="text-sm">
            Don{"'"}t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary/90 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardHeader>

        {err.root && (
          <p className="text-destructive text-center font-medium">
            {err?.root?.message}
          </p>
        )}

        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className={cn(
                "flex w-80 flex-col",
                Object.keys(err).length > 0 ? "gap-2" : "gap-4",
              )}
            >
              {/* Username */}
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Email / Username"
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
                        type={isPasswordVisible ? "text" : "password"}
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
                        endContent={
                          <Button
                            type="button"
                            className="cursor-pointer p-0! hover:bg-transparent hover:text-inherit"
                            variant={"ghost"}
                            onClick={toggleVisibilityPassword}
                          >
                            {isPasswordVisible ? (
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
                disabled={isPendingLogin}
                type="submit"
                className="disabled:bg-primary/90 h-12 w-full cursor-pointer rounded-xl text-base disabled:cursor-progress"
              >
                {isPendingLogin ? (
                  <>
                    <Spinner className="size-5 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

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
import { RegisterFormValues, registerSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { isPasswordVisible, handleChangeVisiblePassword } = useRegister();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    console.log(values);
  }

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

        <CardContent className="px-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-80 flex-col gap-4"
            >
              {/* Fullname */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="mb-0 gap-0">
                    <FormControl>
                      <FloatingLabelInput
                        label="Fullname"
                        {...field}
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
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
                        {...field}
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
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
                        {...field}
                        className="h-14 rounded-[12px] px-2 py-3 text-sm"
                        labelClass="text-sm"
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
                        {...field}
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
                        {...field}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-12 w-full rounded-xl text-base"
              >
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

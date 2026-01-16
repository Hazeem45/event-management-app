import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/lib/validators";
import { IRegister } from "@/types/Auth";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useRegister = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerService = async (payload: IRegister) => {
    const result = await authService.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      form.setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      form.reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  const handleChangeVisiblePassword = (key: "password" | "confirmPassword") => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [key]: !isPasswordVisible[key],
    });
  };

  return {
    isPasswordVisible,
    handleChangeVisiblePassword,
    handleRegister,
    isPendingRegister,
    form,
  };
};

export default useRegister;

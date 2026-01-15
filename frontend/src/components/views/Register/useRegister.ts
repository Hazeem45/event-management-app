import { useState } from "react";

const useRegister = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChangeVisiblePassword = (key: "password" | "confirmPassword") => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [key]: !isPasswordVisible[key],
    });
  };

  return {
    isPasswordVisible,
    handleChangeVisiblePassword,
  };
};

export default useRegister;

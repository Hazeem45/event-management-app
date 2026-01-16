import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
          loading="eager"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-primary text-3xl font-bold">
          Create Account Success
        </h1>
        <p className="text-xl font-bold text-[#71717A]">
          Check your email for account activation
        </p>
        <Button
          variant={"outline"}
          className="border-primary text-primary hover:bg-primary mt-4 h-10 w-fit cursor-pointer rounded-[12px] hover:text-white"
          onClick={() => router.push("/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;

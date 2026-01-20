import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
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
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
          loading="eager"
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-primary text-3xl font-bold">
          {status === "success" ? "Activation Success" : "Activation Failed"}
        </h1>
        <p className="text-xl font-bold text-[#71717A]">
          {status === "success"
            ? "Thank you for register account in Acara"
            : "Confirmation code is invalid"}
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

export default Activation;

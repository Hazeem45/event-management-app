import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authService from "@/services/auth.service";

interface PropTypes {
  status: "success" | "failed";
}

const ActivationPage = (props: PropTypes) => {
  return (
    <AuthLayout title="Activation | Acara">
      <Activation {...props} />
    </AuthLayout>
  );
};

export const getServerSideProps = async (context: {
  query: { token: string };
}) => {
  try {
    const result = await authService.activation({ token: context.query.token });

    if (result.data.data) {
      return {
        props: {
          status: "success",
        },
      };
    } else {
      return {
        props: {
          status: "failed",
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        status: "failed",
      },
    };
  }
};

export default ActivationPage;

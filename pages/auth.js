import AuthForm from "../components/auth/auth-form";
import { useSession, getSession } from "next-auth/react";

function AuthPage() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <AuthForm />;
}

export default AuthPage;

export const getServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";
function ProfilePage() {
  return <UserProfile />;
}

export default ProfilePage;

export const getServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useSession } from "next-auth/react";

function UserProfile() {
  const { status } = useSession();

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  const changePasswordHandler = async (passwordData) => {
    const result = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      header: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();

    console.log(data);
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;

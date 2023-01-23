import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { comparePassword, hashPassword } from "../../../lib/auth";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });

    return;
  }

  const userEmail = session.user.email;

  const { oldPassword, newPassword } = JSON.parse(req.body);

  if (!userEmail || !oldPassword || !newPassword) {
    res.status(401).json({ message: "Empty password or email!" });
    return;
  }

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    await client.close();
    return;
  }

  const currentPassword = user.password;

  const isValid = await comparePassword(oldPassword, currentPassword);

  if (!isValid) {
    res.status(403).json({ message: "Old passwords do not match!" });

    await client.close();

    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  console.log("Password updated successfully", result);

  await client.close();

  res.status(200).json({ message: "Password updated successfully!" });
};

export default handler;

import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://next-auth-app:ptDlNjkhrGevT4Lz@cluster0.ivppj.mongodb.net/next-auth-app?retryWrites=true&w=majority"
  );
};

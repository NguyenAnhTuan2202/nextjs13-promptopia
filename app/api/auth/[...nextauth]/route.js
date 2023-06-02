import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    // store the user id from MongoDB to session
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();

    return session;
  },
  async signIn({ account, profile, user, credentials }) {
    try {
      await connectToDB();

      // check if user already exists
      console.log("profile", profile.email);
      const userExists = await User.findOne({ email: profile.email });

      console.log("userExists", userExists);

      // if not, create a new document and save user in MongoDB
      if (!userExists) {
        console.log("123");
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      console.log("return true");
      return true;
    } catch (error) {
      console.log(">>>>>>>>> Error");
      console.log("Error checking if user exists: ", error.message);
      return false;
    }
  },
});

export { handler as GET, handler as POST };

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all prompt", { status: 500 });
  }
};

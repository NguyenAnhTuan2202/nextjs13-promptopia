import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    console.log("params", params);
    const prompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    console.log("prompt", prompt);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to fetch all prompt", { status: 500 });
  }
};

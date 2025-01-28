import connectDB from "@/config/connectDB";
import { Product, Category } from "@/models";  

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    const populatedCategories = await Category.find().populate("products");

    return new Response(JSON.stringify(populatedCategories), { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
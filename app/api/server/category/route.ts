import connectDB from "@/config/connectDB";
import { Product, Category } from "@/models"; // استيراد الموديلات من ملف واحد

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    // console.log("Categories:", categories);

    const populatedCategories = await Category.find().populate("products");
    // console.log("Populated Categories:", populatedCategories);

    return new Response(JSON.stringify(populatedCategories), { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
import connectDB from "@/config/database";
import Product from "@/models/product";
import Category from "@/models/category";
import formidable from "formidable";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// تعطيل المعالج الافتراضي للبيانات في Next.js
export const config = {
  api: {
    bodyParser: false, // لتعطيل المعالج الافتراضي للبيانات
  },
};

// دالة لجلب المنتجات
export async function GET(req: any) {
  try {
    await connectDB();
    console.log("Connected to MongoDB from Get");

    // استخراج معرف القسم من استعلام الطلب
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    let products;
    if (category) {
      // التحقق من صحة معرف القسم
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return new Response(JSON.stringify({ error: "Invalid Category ID" }), {
          status: 400,
        });
      }

      // جلب المنتجات الخاصة بالقسم
      products = await Product.find({ category });
    } else {
      // جلب جميع المنتجات إذا لم يتم تحديد القسم
      products = await Product.find({});
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

// export async function GET(req: any) {
//   try {
//     await connectDB();
//     console.log("Connected to MongoDB from Get");

//     // استخراج معرف القسم من استعلام الطلب
//     const url = new URL(req.url);
//     const categoryName = url.searchParams.get("category");

//     let products;
//     if (categoryName) {
//       // البحث عن القسم باستخدام الاسم
//       const category = await Category.findOne({ name: categoryName });

//       if (!category) {
//         return new Response(JSON.stringify({ error: "Category not found" }), {
//           status: 404,
//         });
//       }

//       // جلب المنتجات الخاصة بالقسم
//       products = await Product.find({ category: category._id });
//     } else {
//       // جلب جميع المنتجات إذا لم يتم تحديد القسم
//       products = await Product.find({});
//     }

//     return new Response(JSON.stringify(products), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
//       status: 500,
//     });
//   }
// }

export async function POST(req: any) {
  try {
    await connectDB();
    console.log("Connected to MongoDB from Post");

    // قراءة الجسم كـ JSON
    const body = await req.json();
    const { name, price, description, image, category } = body;

    // التحقق من الحقول المطلوبة
    if (!name || !price || !description || !category) {
      return new Response(
        JSON.stringify({
          error: "Name, price, description, and category are required",
        }),
        { status: 400 }
      );
    }

    // التحقق من صحة معرف القسم
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return new Response(JSON.stringify({ error: "Invalid Category ID" }), {
        status: 400,
      });
    }

    // إنشاء المنتج
    const newProduct = new Product({
      name,
      price,
      description,
      image, // image هو رابط نصي
      category,
    });

    // حفظ المنتج في قاعدة البيانات
    await newProduct.save();

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
    });
  }
}

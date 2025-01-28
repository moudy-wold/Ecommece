import connectDB from "@/config/connectDB";
import Product from "@/models/Product";
import Category from "@/models/Category";
import formidable from "formidable";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";


export const config = {
  api: {
    bodyParser: false, 
  },
};


export async function GET(req: any) {
  try {
    await connectDB();
    console.log("Connected to MongoDB from Get");

    
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    let products;
    if (category) {
      
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return new Response(JSON.stringify({ error: "Invalid Category ID" }), {
          status: 400,
        });
      }

      
      products = await Product.find({ category });
    } else {
      
      products = await Product.find({});
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
} 

export async function POST(req: any) {
  try {
    await connectDB();
    console.log("Connected to MongoDB from Post");

    const body = await req.json();
    const { name, price, description, image, category } = body;

    
    if (!name || !price || !description || !category) {
      return new Response(
        JSON.stringify({
          error: "Name, price, description, and category are required",
        }),
        { status: 400 }
      );
    }

    
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return new Response(JSON.stringify({ error: "Invalid Category ID" }), {
        status: 400,
      });
    }
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
      });
    }
    
    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category,
    });

    
    await newProduct.save();

    
    await Category.findByIdAndUpdate(category, {
      $push: { products: newProduct._id },
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
    });
  }
} 
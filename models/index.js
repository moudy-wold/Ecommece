import mongoose from "mongoose";
import ProductSchema from "./Product";
import CategorySchema from "./Category";

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export { Product, Category };
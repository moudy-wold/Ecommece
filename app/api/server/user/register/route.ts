import connectDB from "@/config/connectDB"; // الاتصال بقاعدة البيانات
import User from "@/models/User"; // موديل المستخدمين
import bcrypt from "bcryptjs"; // مكتبة لتشفير كلمات المرور

export async function POST(req: any) {
  try {
    await connectDB(); // الاتصال بقاعدة البيانات

    const { name, email, password, user_role } = await req.json(); // قراءة البيانات من الطلب

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists" }),
        { status: 400 }
      );
    }

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // تخزين كلمة المرور المشفرة
      user_role: user_role || "user", // تعيين دور المستخدم الافتراضي
    });

    // حفظ المستخدم في قاعدة البيانات
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}

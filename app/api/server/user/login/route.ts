import connectDB from "@/config/connectDB";
import User from "@/models/User"; // موديل المستخدمين
import jwt from "jsonwebtoken"; // لإنشاء التوكن

export async function POST(req: any) {
  try {
    await connectDB();

    const { email, password } = await req.json(); // قراءة البيانات من الطلب

    // البحث عن المستخدم في قاعدة البيانات
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // التحقق من كلمة المرور (مقارنة مباشرة)
    if (password !== user.password) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // إنشاء التوكن (JWT)
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, user_role: user.user_role }, // تضمين user_role
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user_role: user.user_role, // إرجاع user_role مع التوكن
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}

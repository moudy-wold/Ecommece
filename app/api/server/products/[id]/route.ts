import Product from "@/models/product";
import connectDB from "@/config/database";

export async function PUT(req: any, { params }: any) {
  await connectDB();

  const { id } = params; // الحصول على ID المنتج من الرابط
  const updatedData = await req.json(); // بيانات التحديث من الطلب

  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, // إعادة المنتج بعد التحديث
    });

    if (!product) {
      return new Response(JSON.stringify({ message: "المنتج غير موجود" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "فشل التحديث", error }), {
      status: 500,
    });
  }
}

export async function DELETE(req: any, { params }: any) {
  await connectDB();

  const { id } = params; // الحصول على ID المنتج من الرابط

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return new Response(JSON.stringify({ message: "المنتج غير موجود" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "تم حذف المنتج بنجاح" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "فشل الحذف", error }), {
      status: 500,
    });
  }
}

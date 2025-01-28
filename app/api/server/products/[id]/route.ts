import Product from "@/models/Product";
import connectDB from "@/config/connectDB";

export async function PUT(req: any, { params }: any) {
  await connectDB();

  const { id } = params;
  const updatedData = await req.json();

  try {
    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
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

  const { id } = params;

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
export async function GET(req: any, { params }: any) {
  await connectDB();

  const { id } = params;

  try {
    const product = await Product.findById(id);

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
    return new Response(JSON.stringify({ message: "فشل جلب المنتج", error }), {
      status: 500,
    });
  }
}

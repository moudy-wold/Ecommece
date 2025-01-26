import { Login } from "@/app/api/Front/auth";
import Loader from "@/app/components/Global/Loader/Loader";
import { Form, Input, notification } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import '@ant-design/v5-patch-for-react-19';

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { setIsLogend } from "@/app/lib/todosSlice";

type FieldType = {
  email?: string;
  password?: string;
};

function FormComponent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (data: FieldType) => {
    try {
      setIsLoading(true);
      Cookies.remove("token");
      const res = await Login(data);
      console.log(res)
      setIsLoading(false);
      notification.success({
        message: "Registration completed successfully",
      });
      Cookies.set("token", res.data.token, { expires: 7, path: "/" });
      localStorage.setItem("user_role", JSON.stringify(res?.data?.user_role));
      dispatch(setIsLogend());
      router.back();

    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
      notification.error({
        message: err.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter Email correctly!",
            },
          ]}
        >
          <Input
            placeholder={"Email"}
            className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "Please enter a valid password!" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
          />
        </Form.Item>

        <div className="flex justify-end">
          <Link
            href={"/auth/change-password"}
            className="text-primary-foreground underline "
          >
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-wrap gap-5 items-center justify-between mt-14">
          <div>
            <button
              type="submit"
              className=" rounded-full py-2 md:pb-3 px-5 md:px-10 text-lg md:text-xl border-2 border-[#006496] bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-200"
            >
              Login
            </button>
          </div>
          <div className="flex items-center">
            <span>No Account? </span>
            <Link href="/auth/register" className="text-[#006496] underline">
              {" "}
              Create Account
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
}

export default FormComponent;


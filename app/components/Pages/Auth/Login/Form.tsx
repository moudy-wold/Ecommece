import { Login } from "@/app/api/Front/auth";
import Loader from "@/app/components/Global/Loader/Loader";
import { Form, Input, notification } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type FieldType = {
  phoneNumber?: string;
  password?: string;
  remember?: string;
};

function FormComponent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [obj, setObj] = useState({});
  const router = useRouter();

  const onFinish = async () => {
    try {
      setIsLoading(true);
      Cookies.remove("token");
      const res = await Login(obj);
      if (res.status === 201) {
        setIsLoading(false);
        notification.success({
          message: "Registration completed successfully",
        });

        Cookies.set("token", res.data.token, { expires: 7, path: "/" });
        localStorage.setItem("userRole", JSON.stringify(res?.data?.data?.role));
        localStorage.setItem("userId", JSON.stringify(res.data.data._id));
        const ids = res?.data?.data?.Wishlists?.map((obj: any) => obj._id);
        localStorage.setItem("userWishList", JSON.stringify(ids));

        // dispatch(setIsLogend());

        // if (res?.data?.data?.role === "admin") {
        //   dispatch(setIsAdmin(true));
        // } else if (res?.data?.data?.role === "employee") {
        //   dispatch(setIsEmployee(true));
        // }

        router.back();

      }
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
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter the phone number correctly!",
            },
          ]}
        >
          <Input
            placeholder={"Phone Number:"}
            className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
            onChange={(e) =>
              setObj((prevState) => ({
                ...prevState,
                phoneNumber: e.target.value,
              }))
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "Please enter a valid password!" },
          ]}
        >
          <Input.Password
            placeholder={"password"}
            className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
            onChange={(e) =>
              setObj((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
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

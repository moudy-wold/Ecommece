"use client";
import { useState } from "react";
import Loader from "@/app/components/Global/Loader/Loader";
import { Checkbox, Form, Input, notification, Modal, Select } from "antd";
import Link from "next/link";
import { Register, RegisterData } from "@/app/api/Front/auth";
import { useRouter } from "next/navigation";
import OTPPopup from "@/app/components/Pages/Auth/Change-password/OTPPopup/OTPPopup";
import { user_rols } from "@/utils/constant";

type FieldType = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  userRole: string;
  accept: boolean;
};

function FormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [openVerifyPopup, setOpenVerifyPopup] = useState<boolean>(false);
  const { push } = useRouter();
  const onFinish = (data: FieldType) => {
    setIsLoading(true);
    const newData: RegisterData = {
      name: data.name,
      email: data.email,
      password: data.password,
      user_role: data.userRole
    }
    Register(newData)
      .then((res) => {
        setOpenVerifyPopup(true);
      })
      .catch((err: any) => {
        console.log(err);
        notification.error({
          message: err.responde.data.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Form name="register-form" onFinish={onFinish} autoComplete="off">
        <div className="">
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input
              placeholder="name"
              className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
            />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "please enter your email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
          />
        </Form.Item>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Form.Item<FieldType>
            name="password"
            rules={[
              { required: true, message: "please enter password!" },
              { min: 6, message: "password must be at least 6 characters long!" },
            ]}
            className="!mb-3"
          >
            <Input.Password
              placeholder="Password"
              className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
            />
          </Form.Item>

          <Form.Item
            name="rePassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "please confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("password does not match")
                  );
                },
              }),
            ]}
          >
            <div>
              <Input.Password
                placeholder="Confirm Password"
                className="!rounded-[2px] !py-3 placeholder:!text-[#646464]"
              />
            </div>
          </Form.Item>
        </div>
        {/* Start userRole */}
        <Form.Item<FieldType>
          name="userRole"
          rules={[{ required: true, message: "Please Select user Role" }]}
        >
          <Select
            allowClear
            options={user_rols}
            placeholder="select One"
            className="w-full p-1 h-14"
          />
        </Form.Item>
        {/* End userRole */}
        <div>
          <Form.Item<FieldType>
            name="accept"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please agree to terms and conditions",
              },
            ]}
          >
            <Checkbox rootClassName="gap-2">
              Agree To{" "}
              <Link href={"/terms-of-use"} className="text-[#006496] underline">
                Terms And Conditions
              </Link>{" "}
              And
              <Link
                target="_blank"
                href={"/privacy-policy"}
                className="text-[#006496] underline"
              >
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>
        </div>


        <div className="flex flex-wrap gap-5 items-center justify-center">
          <button
            type="submit"
            className=" rounded-full py-2 md:pb-3 px-5 md:px-10 text-lg md:text-xl border-2 border-[#006496] bg-[#006496] text-white hover:text-[#006496] hover:bg-white transition-all duration-200"
          >
            Register
          </button>
        </div>
        <div className="flex items-center w-fit mr-auto mt-8">
          <span> Have an Account? </span>
          <Link href="/auth/login" className="text-[#006496] underline">
            {" "}
            login
          </Link>
        </div>
      </Form>
      <Modal
        centered
        open={openVerifyPopup}
        okButtonProps={{ style: { display: "none" } }}
        onCancel={() => {
          setOpenVerifyPopup(false);
          push("/auth/login");
        }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={650}
      >
        <OTPPopup setOpenVerifyPopup={setOpenVerifyPopup} />
      </Modal>
    </div>
  );
}

export default FormComponent;

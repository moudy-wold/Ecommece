'use client';
import Loader from '@/app/components/Global/Loader/Loader';
import { Alert, Form, Input, Modal, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import dynamic from 'next/dynamic'

const OTPPopup = dynamic(() => import('./OTPPopup/OTPPopup'), { ssr: false })

type FieldType = {
  email: string;
};

function FormComponent(props: any) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [openVerifyPopup, setOpenVerifyPopup] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const router = useRouter();

  const onFinish = async ({ email }: FieldType) => {
    // setIsLoading(true)
    // setEmailValue(email)
    // ForgetPass(email)
    //   .then((res: any) => {
    //     console.log(res)
    //     if (res.status) {
    //       setIsLoading(false)
    //       notification.success({
    //         message: "code has been sent to email"
    //       })
    //       setOpenVerifyPopup(true)
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.log(err)
    //     notification.error({
    //       message: err.response.data.message
    //     })
    //     setIsLoading(false)
    //   })
  }

  return (
    <div className="m-auto p-4">
      <Loader isLoading={isLoading} />
      {errors.length !== 0 && (
        <div className="my-4">
          <Alert message={"Error"} description={errors} type="error" showIcon />
        </div>
      )}

      <h1 className="text-primary-foreground text-xl md:text-xl xl:text-3xl text-center mb-7 font-semibold">
        Send Password Change Request
      </h1>

      <div>
        <Form
          form={form}
          name="send-email"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          className=""
        >
          <Form.Item<FieldType>
            name="email"
            className="block"
            label={<span className="text-sm  md:text-base">Email</span>}
            rules={[{ required: true, message: "please enter your email" }]}
          >
            <Input
              placeholder="please enter your email"
              className="!rounded-[8px] !py-3  w-full block" />
          </Form.Item>
          <div className=" col-span-2">
            <button
              type="submit" className="rounded-full w-28 py-2 flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
            >
              Send
            </button>
          </div>
        </Form>

      </div>

      <div className="text-[#A0A0A0] text-sm  mt-4">
        Do You Want To Login{' '}
        <Link href={'/auth/login'} className="text-[#006496] underline">
          login
        </Link>
      </div>
      {openVerifyPopup &&
        <Modal
          title="Account Creation Details"
          centered
          open={openVerifyPopup}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => { setOpenVerifyPopup(false); router.push("/auth/login"); }}
          width={500}
        >
          <OTPPopup setOpenVerifyPopup={setOpenVerifyPopup} emailValue={emailValue} locale={props.locale} />
        </Modal>
      }

    </div>
  );
};

export default FormComponent;

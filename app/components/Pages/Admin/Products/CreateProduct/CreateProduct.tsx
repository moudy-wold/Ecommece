"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Upload, notification, } from "antd";
import { useForm } from 'antd/es/form/Form';
import { AddProduct } from "@/app/api/Front/products";
import Loader from '@/app/components/Global/Loader/Loader';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import { IoInformationCircleOutline } from "react-icons/io5";
import { CategoryList } from "@/utils/constant";

type FieldType = {
  id: string,
  images: any,
  name: string,
  price: string,
  description: string
  category_id: string

};

function CreateProduct() {

  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState<any>();

  useEffect(() => {
    setCategoryId(localStorage.getItem("categoryId"))
  }, [])

  const onFinish = async ({ name, images, price, description }: FieldType) => {
    setIsLoading(true);
    const formData: any = new FormData();
    formData.append("name", name);

    for (let i = 0; i < images.length; i++) {
      formData.append('image', images[i].originFileObj!);
    }

    formData.append('price', price);
    formData.append("description", description);
    formData.append('category', "679437f84f76e9c406d00182");

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    try {
      const res = await AddProduct(formData);
      notification.success({
        message: "product added successfully",
      });
      console.log(res)
      // router.back();
      setIsLoading(false);

    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      notification.error({
        message: error.response.data.message,
      });
    }
  };
  const handleFinishFailed = (errorInfo: any) => {
    form.scrollToField(errorInfo.errorFields[0].name, {
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="p-5">
      {isLoading && <Loader />}
      <Form
        form={form}
        name="product-create"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={handleFinishFailed}
        className="lg:grid lg:grid-cols-2 gap-2"
      >
        {/* Start Image */}
        <div>
          {/* Start Hint */}
          <div className="py-2 px-1 flex items-center gap-1">
            <IoInformationCircleOutline />
            <p className="text-xs">For faster site performance, Enter images in .webp format</p>
          </div>
          {/* End Hint */}
          <Form.Item<FieldType>
            name="images"
            label={<span className="text-sm md:text-base">product images</span>}
            rules={[{ required: true, message: "Please Enter the image" }]}
            valuePropName="fileList"
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              className="w-full"
            >
              <Button
                className="w-full h-12 justify-between text-sm md:text-xl"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f6f6f6",
                }}
              >
                <p> qqqqAttach photo with size  350px * 350px </p>
                <Image src="/assets/ImgUpdateIcon.svg" alt="sasd" width={24} height={24} className="" />
              </Button>
            </Upload>

          </Form.Item>
        </div>
        {/* End Image */}

        {/* Start Name */}
        <Form.Item<FieldType>
          name="name"
          label={<span className="text-sm md:text-base">product Name</span>}
          rules={[{ required: true, message: "Please Enter product name" }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>
        {/* End Name */}

        {/* Start Price */}
        <Form.Item<FieldType>
          name="price"
          label={
            <span className="text-sm md:text-base"> Price</span>
          }
          rules={[{ required: true, message: "Please Enter Price" }]}
        >
          <Input className="!rounded-[8px] !py-3" />
        </Form.Item>
        {/* End Price */}

        {/* start description */}
        <Form.Item<FieldType>
          name="description"
          label={<span className="text-sm md:text-base"> Description</span>}
          rules={[{ required: true, message: "Please Enter Description" }]}
        >
          <Input.TextArea className="!rounded-[8px] !py-3" />
        </Form.Item>
        {/* End description */}
        
        {/* Start category */}
        <Form.Item<FieldType>
          name="category_id"
          label={<span className="text-sm md:text-base"> Category Id</span>}
          rules={[{ required: true, message: "Please Select Category" }]}
        >
          <Select
            initialValues=""
            style={{ width: 120 }}
            allowClear
            options={CategoryList}
            placeholder="select it" 
            className="!w-[300px] p-1 h-14"
          />
        </Form.Item>
        {/* End Category */}
        <button
          type="submit"
          className="col-span-2 w-20 border-2 border-[#006496] rounded-full  mt-5 py-2 text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
        >
          Add
        </button>
      </Form>
    </div >
  );
}

export default CreateProduct;

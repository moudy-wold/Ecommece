"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification, Select, Upload, } from "antd";
import { GetProductById, EditProductById } from '@/app/api/Front/products';
import { useForm } from 'antd/es/form/Form';
import { useRouter, } from 'next/navigation';
import Loader from "@/app/components/Global/Loader/Loader";
import FetchImageAsFile from "@/app/components/Global/FetchImageAsFile/FetchImageAsFile";
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
type Props = {
  product_id: string
}
function EditProduct({ product_id }: Props) {
  const [form] = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [getData_isDone, setGetData_isDone] = useState(true);
  const [returnDetails, setReturnDetails] = useState([{}]);
  const [categoryId, setCategoryId] = useState<any>();
  const [data, setData] = useState<any>([])

  const getData = async () => {
    setIsLoading(true)
    try {
      const res = await GetProductById(product_id);
      setData(res?.data)
      form.setFieldsValue({
        name: res?.data?.name,
        images: res?.data?.image,
        price: res?.data?.price,
        description: res?.data?.description,
        category_id: res?.data?.category,
      });
    } catch (err: any) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
    // const data = ProductData?.data;
    // if (data) {
    //   if (getData) {


    //     form.setFieldValue('name', data?.data?.name);
    //     form.setFieldValue(
    //       'images',
    //       data.data.images.map((image: any) => ({
    //         uid: String(image),
    //         name: image,
    //         status: 'done',
    //         url: image,
    //       }))
    //     );
    //     form.setFieldValue('price', data?.data?.price);s
    //     form.setFieldValue('description', data?.data?.description);

    //   }
    //   setGetData(false)
    // }
  }, [product_id])

  const onFinish = async ({ name, images, price, description, category_id }: FieldType) => {

    // setIsLoading(true);
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);

    //  start image fixed  ****************************
    // const imageFiles = await Promise.all(
    //   images.map(async (file: any) => {
    //     if (file.url) {
    //       return await FetchImageAsFile(file.url, file.url.split('/').pop() || 'image.jpg');
    //     }
    //     return file.originFileObj; // Return the original file if there's no URL
    //   })
    // );

    // Append processed images to formData
    // imageFiles.forEach((file: any) => {
    //   formData.append('images[]', file);
    // });
    // end my code *************
    // formData.append('images', images);

    // formData.append('price', price);
    // formData.append('categoryId', categoryId);
    const newData = {
      name: name,
      price: price,
      image: images,
      description: description,
      category_id: category_id
    }
    EditProductById(product_id, newData)
      .then((res) => {
        form.resetFields();
        setIsLoading(false)
        notification.success({
          message: "Modified successfully"
        });
        router.back();
      })
      .catch((err) => {
        console.log(err.response.data)
        notification.error({
          message: err.response.data.error
        })
      }).finally(() => {
        setIsLoading(false)
      })
  }

  const handleFinishFailed = (errorInfo: any) => {
    form.scrollToField(errorInfo.errorFields[0].name, {
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      <div className="">
        <Form
          form={form}
          name="product-create"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={handleFinishFailed}
          className="lg:grid lg:grid-cols-2 gap-4"
        >
          {/* Start Image */}
          <div>
            {/* <Form.Item<FieldType>
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
                  <p> Attach photo with size  350px * 350px </p>
                  <Image src="/assets/ImgUpdateIcon.svg" alt="sasd" width={24} height={24} className="" />
                </Button>
              </Upload>

            </Form.Item> */}
            <Form.Item<FieldType>
              name="images"
              label={<span className="text-sm md:text-base">product image</span>}
              rules={[{ required: true, message: "Please Enter the image url" }]}
            >
              <Input className="!rounded-[8px] !py-3" />
            </Form.Item>
            {/* Start Hint */}
            <div className="py-2 px-1 flex items-center gap-1">
              <IoInformationCircleOutline />
              <p className="text-xs">For faster site performance, Enter images in .webp format</p>
            </div>
            {/* End Hint */}
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
          <div className="col-span-2 w-1/2">
          <Form.Item<FieldType>
            name="category_id"
            label={<span className="text-sm md:text-base"> Category Id</span>}
            rules={[{ required: true, message: "Please Select Category" }]}
          >
            <Select
              allowClear
              options={CategoryList}
              placeholder="select it"
              className="w-[300pd] p-1 h-14 "
            />
          </Form.Item>
        </div>
          {/* End Category */}
          <button
            type="submit"
            className="border-2 border-[#006496] rounded-full  mt-5 w-28 py-2  flex items-center justify-center text-base lg:text-xl text-white bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1"
          >
            Edit
          </button>
        </Form>
      </div>
    </div>
  );
}
export default EditProduct;

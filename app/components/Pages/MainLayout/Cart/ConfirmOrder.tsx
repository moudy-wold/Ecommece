"use client";
import React, { useEffect, useState } from "react";
import { Card, Form, Input, notification, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
// import { ConfirmOrder } from "@/app/api/order";
import Loader from "@/app/components/Global/Loader/Loader";
import axios from "axios";

type FieldType = {
  userName: string;
  phoneNumber: string;
  address: string;
  note?: string;
  city: string;
  district: string,
  neighborhoods: string,
  sokak_no: string,
  building_no: string,
  flat_no?: string;
};
function ConfirmOrderCom({ data }: any) {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [openPayMethod, setOprnPayMethod] = useState(false)
  const [cities, setCities] = useState<any>([]);
  const [dynamicDistrict, setDynamicDistrict] = useState<any>();
  const [neighborhoodss, setNeighborhoods] = useState()

  useEffect(() => {
    GetCiteis()
  }, [])

  const GetCiteis = async () => {
    const url = "https://turkiyeapi.dev/api/v1/";
    axios.get(`${url}provinces?fields=name`)
      .then((res) => {
        const updatedCities = res?.data?.data?.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          }
        });
        setCities(updatedCities);
      })
      .catch((err: any) => {
        console.log(err);
      });


  }
  const onChangeCity = async (value: any) => {
    const distrObj: any = []
    const url = `https://turkiyeapi.dev/api/v1/provinces?name=${value}`
    axios.get(url)
      .then((res: any) => {
        res?.data?.data[0]?.districts.map((item: any) => {
          const obj = { label: item.name, value: item.name, id: item.id }
          distrObj.push(obj)
        })
        setDynamicDistrict(distrObj)
      })
      .catch((err: any) => {
        console.log(err)
      })
  };

  const onChangeDistrict = async (value: any, option: any) => {
    const neighborhoodsObj: any = []

    const url = `https://turkiyeapi.dev/api/v1/districts/${option?.id}`

    axios.get(url)
      .then((res: any) => {
        res?.data?.data?.neighborhoods?.map((item: any) => {
          const obj = { label: item.name, value: item.name, id: item.id }
          neighborhoodsObj.push(obj)
        })
        setNeighborhoods(neighborhoodsObj)
      })
      .catch((err: any) => {
        console.log(err)
      })
  };
  const onFinish = async (data: any) => {
    setIsLoading(true)
    setTimeout(() => {
      notification.success({
        message: "Order Has Been Confirmed"
      })
      router.push(`https://buy.stripe.com/test_4gw8yP8Cp2ChcOAdQQ`)
    }, 500)
    // try {
    //   const res = await ConfirmOrder(data);
    //   console.log(res);
    //   notification.success({
    //     message: "Order Has Been Confirmed" 
    //   });
    //   router.back();
    // } catch (err: any) {
    //   console.log(err);
    //   notification.error({
    //     message: err.response.data.message,
    //   });
    // }finally{
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <Card>
        <Form
          form={form}
          name="user-create"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
          className=""
        >
          <Form.Item<FieldType>
            name="userName"
            label={<span className="text-sm  md:text-base">Name </span>}
            rules={[{ required: true, message: "Please Enter Name" }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="phoneNumber"
            label={
              <span className="text-sm  md:text-base">Phone Number</span>
            }
            rules={[{ required: true, message: "please_enter_phoneNumber" }]}
          >
            <Input
              className="!rounded-[8px] !py-3"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="address"
            label={
              <span className="text-sm  md:text-base">Address</span>
            }
            rules={[{ required: true, message: "please Eenter Adress" }]}
          >
            <Input.TextArea
              className="!rounded-[8px] !py-3"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="note"
            label={
              <span className="text-sm  md:text-base">
                Additional Notes
              </span>
            }
            rules={[{ required: false }]}
          >
            <Input.TextArea
              className="!rounded-[8px] !py-3"
            />
          </Form.Item>
          {/* Start address */}
          <div className="">
            <p className="mb-5">Address :</p>

            <div className="grid grid-cols-3 gap-2">

              {/* Start City */}
              <Form.Item<FieldType>
                name="city"
                rules={[{ required: true, message: "Please Enter City" }]}
              >

                <Select
                  showSearch
                  placeholder="Enter City"
                  optionFilterProp="label"
                  onChange={(e) => onChangeCity(e)}
                  options={cities}
                />
              </Form.Item>
              {/* End City */}

              {/* Start District */}
              <Form.Item<FieldType>
                name="district"
                rules={[{ required: true, message: "Please Enter District" }]}
              >
                <Select
                  showSearch
                  placeholder="Enter District"
                  optionFilterProp="label"
                  onChange={(value, option) => onChangeDistrict(value, option)}
                  options={dynamicDistrict}
                />
              </Form.Item>
              {/* End District */}

              {/* Start neighborhoods */}
              <Form.Item<FieldType>
                name="neighborhoods"
                rules={[
                  { required: true, message: "Please Enter Neighborhoods" },
                ]}
              >
                <Select
                  placeholder="Select Neighborhoods"
                  optionFilterProp="label"
                  options={neighborhoodss}
                />
              </Form.Item>
              {/* End District */}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Start Sokak */}
              <Form.Item<FieldType>
                name="sokak_no"
                rules={[{ required: true, message: "Please Enter Sokak No" }]}
              >
                <Input
                  placeholder="Sokak No"
                  className="!rounded-[7px] !py-2 "
                />
              </Form.Item>
              {/* End Sokak */}

              {/* Start Building_no */}
              <Form.Item<FieldType>
                name="building_no"
                rules={[{ required: true, message: "Please Enter Building No" }]}
              >
                <Input
                  placeholder="Building No"
                  className="!rounded-[7px] !py-2 "
                />
              </Form.Item>
              {/* End Building_no */}


              {/* Start Flat */}
              <Form.Item<FieldType>
                name="flat_no"
                rules={[{ required: false, message: "Please Enter Flat" }]}
              >
                <Input
                  placeholder="flat"
                  className="!rounded-[7px] !py-2 "
                />
              </Form.Item>
              {/* End Flat */}

              {/* Start  */}
            </div>
          </div>
          {/* End address*/}

          <div className=" col-span-2">
            <button
              type="submit"
              className={`"rounded-full p-2  flex items-center justify-center text-base lg:text-xl text-white border-2 border-[#006496] bg-[#006496] transition-all hover:bg-white hover:text-[#006496] hover:translate-y-1`}
            >
              Send
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default ConfirmOrderCom;

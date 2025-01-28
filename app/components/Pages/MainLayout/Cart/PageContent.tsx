"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Modal, notification } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const ConfirmOrder = dynamic(() => import("./ConfirmOrder"), { ssr: false })

function CartContent() {
  const router = useRouter();
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [data, setData] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [totalCount, setTotalCount] = useState<any>(1);
  const [cateCount, setCateCount] = useState<any>(0);
  const [refreshCounte, setRefreshCounte] = useState(false);
  const [currentProductPrice, setCurrentProductPrice] = useState(0);
  const [currentProductId, setCurrentProductId] = useState("");
  const [Inc, setInc] = useState(false);
  const [Dec, setDec] = useState(false);
  const { cart } = useSelector((state: any) => state.counter)
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session]);

  const getData = async () => {
    // try {
    //   const res = await GetAllProductsFromCard();
    //   setData(res.data?.data);
    //   setTotalPrice(
    //     res?.data?.data?.reduce((acc: number, item: any) => {
    //       return acc + +item.price;
    //     }, 0)
    //   );
    //   setTotalCount(
    //     res?.data?.data?.reduce((acc: number, item: any) => {
    //       return acc + +item.quantity;
    //     }, 0)
    //   );
    // } catch (err: any) {
    //   console.log(err);
    //   notification.error({
    //     message: err.response.data.message,
    //   });
    // }
  };
  useEffect(() => {
    setData(cart)
  }, [])

  useEffect(() => {
    setTotalCount(
      cart?.reduce((acc: number, item: any) => {
        return acc + item.quantity;
      }, 0)
    );
  }, [data, refreshCounte, cart]);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc: number, item: any) => {
        return acc + +item.price;
      }, 0)
    );
  }, [data, cart, refreshCounte,]);

  useEffect(() => {
    setTotalCount(totalCount + 1);
    setTotalPrice(totalPrice + currentProductPrice);
  }, [Inc]);

  useEffect(() => {
    setTotalPrice(totalPrice - currentProductPrice);
    setTotalCount(totalCount - 1);
  }, [Dec]);

  useEffect(() => {
    const updatedArray = data.filter(
      (item: any) => item.id !== currentProductId
    );
    setData(updatedArray);
  }, [currentProductId]);

  return (
    <div className="container">
      <h1 className=" text-gray-500 text-3xl mb-5 px-3">
        Cart {data.length} Products{" "}
      </h1>
      <div className="grid lg:grid-cols-[75%_25%] gap-10">
        <div className="">
          <div className="">
            {cart?.map((item: any, index: number) => (
              <div key={index} className="">
                <ProductCard
                  data={item}
                  deleteItem={deleteItem}
                  setDeleteItem={setDeleteItem}
                  refreshCounte={refreshCounte}
                  setRefreshCounte={setRefreshCounte}
                  setInc={setInc}
                  Inc={Inc}
                  setDec={setDec}
                  Dec={Dec}
                  setCurrentProductPrice={setCurrentProductPrice}
                  setCurrentProductId={setCurrentProductId}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2">
          <div className="p-5 flex flex-col items-start gap-5 rounded-xl bg-[#f3f3f399]">
            <h1 className="text-2xl font-semibold text-[#555] ">
              Application Summary
            </h1>
            <hr className="h-[2px] w-full bg-gray-400 " />

            <div className="flex flex-row items-center justify-between w-full text-[#555]">
              <span className="text-xl">Count Of Products</span>
              <span className="">{totalCount}</span>
            </div>
            <div className="flex flex-row items-center justify-between w-full text-[#555] -mt-3">
              <span className="text-xl">Price of Products</span>
              <span className="">${totalPrice}</span>
            </div>
          </div>
          <div className="mt-8">
            <button
              disabled={cart.length == 0 ? true : false}
              onClick={() => {
                setOpenConfirmOrder(true);
              }}
              className={`${cart.length == 0 ? "cursor-not-allowed " : "cursor-pointer"} w-full rounded-xl pb-2 pt-[4px] text-2xl font-semibold text-white bg-[#006496] border-2 border-[#006496] hover:text-[#006496] hover:bg-white  transition-all duration-150 cursor-pointer`}
            >
              Confirme Order
            </button>{" "}
          </div>
        </div>
      </div>

      {/* Start Confirm Order Modal */}
      <div>
        {openConfirmOrder &&
          <Modal
            title="Confirme Order"
            open={openConfirmOrder}
            onCancel={() => setOpenConfirmOrder(false)}
            cancelText="close"
            okButtonProps={{
              style: { backgroundColor: "#4096ff", display: "none" },
            }}
          >
            <ConfirmOrder />
          </Modal>
        }
      </div>
      {/* End Confirm Order Modal */}
    </div>
  );
}

export default CartContent;

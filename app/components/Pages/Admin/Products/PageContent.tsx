"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/app/components/Global/Loader/Loader";
import { DeleteProductById, GetProductsByCategory } from "@/app/api/Front/products";
import { Space, Table, Modal, Button, notification } from "antd";
import moment from "moment";
import { ColumnsType } from "antd/es/table";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import SearchProducts from "@/app/components/Global/Search/SearchProducts/SearchProducts";

function ProductsList({ category_id }: any) {
    const [openDelete, setOpenDelete] = useState(false);
    const [product_id, setProduct_id] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(false)

    const getData = async () => {
        setIsLoading(false)
        try {
            const res = await GetProductsByCategory(category_id)
            setData(res?.data)
        } catch (err: any) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [update])

    const hideModalAndDeleteItem = () => {
        setIsLoading(true);
        setOpenDelete(false);
        DeleteProductById(product_id)
            .then((res) => {
                if (res.status) {
                    notification.success({
                        message: "product has been successfully deleted",
                    });
                }
                setOpenDelete(false);
                setIsLoading(false);
                setUpdate(!update)
            })
            .catch((err) => {
                notification.error({
                    message: err.response.data.message,
                });
            });
    };

    const columns: ColumnsType<any> = [
        {
            title: "product_name",
            dataIndex: "name",
            key: "name",
            width: 300,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: "product_image",
            width: 250,
            dataIndex: "images",
            key: "images",
            render: (_, record) => (
                <Space size="middle">
                    <span
                        className="border-2 border-gray-400 rounded-xl p-1 hover:bg-gray-100 block text-xs lg:text-xl text-center !w-[150px] !h-[150px]"
                    >
                        <Image
                            src={record?.image}
                            height={150}
                            width={150}
                            alt={"record.images[0]"}
                            className="rounded-xl !w-[150px] !h-[130px]"
                        />
                    </span>
                </Space>
            ),
        },

        {
            title: "date_added",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "actions",
            width: 250,
            key: "action",
            render: (_, record) => (
                <Space size="middle" onClick={() => { setProduct_id(record.id); }}>

                    <a href={`/admin/products/edit/${record.id}`}>
                        <CiEdit />
                    </a>

                    <a>
                        <RiDeleteBinLine
                            onClick={() => {
                                setOpenDelete(true);
                            }}
                        />
                    </a>


                </Space>
            ),
        },
    ];

    const tableData = data?.map((item: any) => ({
        id: item._id,
        images: item.images,
        name: item.name,
        description: item.description,
        createdDate: moment(item.createdAt).locale("en").format("DD/MM/YYYY"),
    }));

    return (
        <div className="">
            {isLoading && <Loader />}

            <div className="grid grid-cols-[25%_68%] gap-2 mb-2">
                <div className="flex items-center ">
                    <Button className="">
                        <Link
                            href={`/admin/products/create`}
                            className="flex items-center justify-beetwen"
                        >
                            Add Product <CiCirclePlus className="mx-1" />
                        </Link>
                    </Button>
                </div>
                <div className="p-4" >
                    <SearchProducts />
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={tableData}
                scroll={{ x: 1100 }}
            // pagination={{ // For Pagination
            //     current: currentPage,
            //     pageSize: pageSize,
            //     total: totalItems,
            //     onChange: handlePageChange,
            // }}
            />


            <div>

                {/* Start Delete Product Model */}
                <Modal
                    title="Delete Product"
                    open={openDelete}
                    onOk={hideModalAndDeleteItem}
                    onCancel={() => setOpenDelete(false)}
                    okText="confirm"
                    cancelText="close"
                    okButtonProps={{ style: { backgroundColor: "#4096ff" } }}
                >
                    <p>are you sure you want to delete the product?</p>
                </Modal>
                {/* End Delete Product Model */}


            </div>
        </div>
    );
}

export default ProductsList;

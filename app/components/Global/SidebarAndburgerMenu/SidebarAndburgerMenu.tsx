"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuProps, Space, Spin } from "antd";
import { useSelector } from "react-redux";
// import { setcategoryId } from "@/app/lib/todosSlice";
import { GetAllCategories } from "@/app/api/Front/category";
import MenuItems from "../MenuItems/MenuItems";
import Image from "next/image";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { FaInfoCircle, FaBorderNone } from "react-icons/fa";
import { BiCustomize, BiSupport } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { AiTwotoneSliders } from "react-icons/ai";
import { TfiLayoutSlider, TfiLayoutSliderAlt } from "react-icons/tfi";
import { RiAdminFill } from "react-icons/ri";
import { RxSection } from "react-icons/rx";
import { GrPieChart } from "react-icons/gr";
import { FaFirstOrderAlt } from "react-icons/fa";
import { SiFoursquarecityguide } from "react-icons/si";
import { TbCategoryFilled } from "react-icons/tb";
import { SidebarMenuItemTypes } from "@/utils/types";



function Sidebar() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState("0");

  const AdminItems: SidebarMenuItemTypes[] = [
    {
      label: <Link href="/admin/products/create">Add Phones</Link>,
      key: "1",
      icon: <BiCustomize />,
      url: "/admin/products/create",
    },

    {
      label: "Sections",
      key: "5.5",
      icon: <RxSection />,
      url: "/",
      children: [
        {
          label: <Link href="/admin/category/679437f84f76e9c406d00182">Phones</Link>,
          key: "1.1",
          icon: <CiCirclePlus />,
        },
        {
          label: <Link href="/admin/category/6794385a4f76e9c406d00183">Laptop</Link>,
          key: "1.2",
          icon: <BiCustomize />,
        },
        {
          label: <Link href="admin/category/6794386d4f76e9c406d00184">Screens</Link>,
          key: "1.3",
          icon: <BiCustomize />,
        },
      ],
    },
    {
      label: <Link href="/admin/orders"> Orders</Link>,
      key: "3333",
      icon: <FaBorderNone />,
      url: "/admin/orders",
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Space size="large">
            <Spin size="large" />
          </Space>
        </div>
      )}
      <div
        className={` bg-white w-[290px] h-[100vh] overflow-auto `}
      >
        <div className={`pl-2 pt-6 pb-16`}>

          {/* <MenuItems
            setcategoryId={setcategoryId}
            setCurrent={setCurrent}
            setOpenKeys={setOpenKeys}
            current={current}
            updatedAdminItems={updatedAdminItems}
            categoryList={categoryList}
          /> */}
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={AdminItems}
          />
        </div>
      </div>
    </>
  );
}

export default Sidebar;

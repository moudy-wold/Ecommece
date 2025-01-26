"use client";
import React, { useState   } from "react";
import { Menu, MenuProps, Space, Spin } from "antd";
import AdminItems from "../AdminItems/AdminItems";

function SidebarAndburgerMenu() {
  const Items = AdminItems()
   
  return (
    <>
      <div className={` bg-white w-[290px] h-[100vh] overflow-auto `}>
        <div className={`pl-2 pt-6 pb-16`}>
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={Items}
          />
        </div>
      </div>
    </>
  );
}

export default SidebarAndburgerMenu;

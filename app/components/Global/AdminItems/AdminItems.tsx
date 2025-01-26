import { SidebarMenuItemTypes } from "@/utils/types";
import Link from "next/link";
import React from "react"
import { BiCustomize } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { FaBorderNone } from "react-icons/fa";
import { RxSection } from "react-icons/rx";

function AdminItems() {
    const AdminItemss: SidebarMenuItemTypes[] = [
        {
            label: <Link  href="/admin/products/create">Add Phones</Link>,
            key: "1",
            icon: <BiCustomize />,
            url: "/admin/products/create",
        },
        {
            label: "Sections",
            key: "5.5",
            icon: <RxSection />,
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

    return AdminItemss
}
export default AdminItems
import React, { ReactNode } from "react";
import Sidebar from "../components/Global/SidebarAndburgerMenu/SidebarAndburgerMenu";

interface RootLayoutProps {
    children: ReactNode;
}

function AdminLayout({ children }: RootLayoutProps) {
    return (
        <div className="grid lg:grid-cols-[20%_78%] gap-4  " >
            <div className="hidden lg:block">
                <Sidebar />
            </div>
            {children}
        </div>

    );
}

export default AdminLayout;



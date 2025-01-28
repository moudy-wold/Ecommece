"use client"
import React, { ReactNode, useEffect } from "react";
import Sidebar from "../components/Global/SidebarAndburgerMenu/SidebarAndburgerMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RootLayoutProps {
    children: ReactNode;
}

function AdminLayout({ children }: RootLayoutProps) {
    const router = useRouter()
    const { data: session } = useSession();
    useEffect(() => {
        setTimeout(()=>{
            if (session?.user) {
                if ((session.user as any).user_role !== "admin") {
                    router.push("/")
                }
            }else{
                router.push("/")
            }
        },2000)
    }, [session]);
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



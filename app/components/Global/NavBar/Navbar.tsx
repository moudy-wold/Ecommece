"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io"
import UserIcons from "../UserIcons/UserIcons";
import SearchProducts from "../Search/SearchProducts/SearchProducts";
import SidebarAndburgerMenu from "@/app/components/Global/SidebarAndburgerMenu/SidebarAndburgerMenu"
import { useSession } from "next-auth/react";

function Navbar() {
  const path = usePathname();
  const [openSearch, setOpenSearch] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false)

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      if ((session.user as any).user_role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false)
      }
    } else {
      setIsAdmin(false)
    }
  }, [session]);


  useEffect(() => {
    if (window.innerWidth < 1023) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [])

  return (
    <main className={` lg:container py-2 lg:py-6 `}>
      {/* Start Small Screen */}
      <div className={`lg:hidden grid grid-cols-[78%_20%] min-w-full items-center justify-between `}>

        {/* Start First Child */}
        <div className={` ml-3  flex items-center gap-5`}>

          {/* Start BurgerMenu  */}
          <div className="">
            <GiHamburgerMenu
              className="text-3xl"
              onClick={() => {
                setOpenBurgerMenu(!openBurgerMenu)
              }}
            />
            <div className={`${openBurgerMenu ? "left-0" : "-left-[100%]"} absolute transation-all duration-200`}>
              <SidebarAndburgerMenu />
            </div>
          </div>
          {/* End BurgerMenu /}

              

              {/* Start Cart Icon */}
          {
            !isAdmin &&
            <div className=" hover:scale-110 transition-all duration-200 ">
              <Link
                href={`/cart`}
                className="flex !flex-col justify-center items-center "
              >
                <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              </Link>
            </div>
          }


          {/* Start Search Component */}
          <div className="transition-all duration-200  flex items-center !z-50">
            {openSearch ? (
              <> <IoMdClose className={` -ml-1 text-xl cursor-pointer`} onClick={() => setOpenSearch(!openSearch)} /></>
            ) : (
              <> <CiSearch className={` -ml-1  text-xl cursor-pointer `} onClick={() => setOpenSearch(!openSearch)} /> </>
            )}
            <div className={`${openSearch ? " right-1/2 translate-x-1/2  " : " -right-[110%] "} absolute !z-50 top-10 transition-all duration-250 w-[95%] md:w-3/5  `}>
              <SearchProducts setOpenSearch={setOpenSearch} store={false} />
            </div>

          </div>
          {/* End Search Component */}


          {/* Start DashBiard icon */}
          {isAdmin &&
            <div className="">
              <Link href="/admin">
                <GrUserAdmin className="text-xl text-gray-400 font-normal cursor-pointer " />
              </Link>
            </div>
          }
          {/* End Dashboard Icon */}
        </div>
        {/* End First Child */}

        {/* Start Dashboard Icon && Logo */}
        <div className="flex items-center justify-end px-2">
          <div >
            <Link href="/">
              <Image
                src={"/assets/logo.png"}
                height={100}
                width={137}
                alt="Logos"
                className="!w-[100px] !h-[25px] "
              />
            </Link>
          </div>
        </div>
        {/* End Dashboard Icon && Logo */}

      </div>
      {/* End Small Screen */}

      {/* Start Lg Screen */}
      <div className="hidden lg:grid grid-cols-[30%_35%_31%] items-center justify-between">

        {/* Start Logo */}
        <div className="flex items-center ">
          <Link href="/" className="mr-2">
            <Image
              // src={infoData?.data?.logo != "" && infoData?.data?.logo != undefined ? infoData?.data?.logo : "/assets/logo.png"}
              src={"/assets/logo.png"}
              height={154}
              width={154}
              alt="Logoss"
            />
          </Link>
        </div>
        {/* End Logo */}

        {/* Start Search */}
        <div className="w-full mx-auto">
          <SearchProducts store={isAdmin && path.includes("admin") ? true : false} />
        </div>
        {/* End Search */}

        {/* Start User Icons */}
        <div className="flex items-center justify-end">
          <UserIcons isMobile={isMobile} />
        </div>
        {/* End User Icons */}
      </div>
      {/* ENd Lg Screen */}
    </main>
  );
}

export default Navbar;

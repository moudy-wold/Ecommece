import React, { useEffect, useState } from "react";
import Loader from "@/app/components/Global/Loader/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "@/app/api/Front/auth";
// import { setIsLogend } from "@/app/lib/todosSlice";
import { Modal, notification, } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { BsArrowsExpandVertical } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

type Props = {
  isMobile: boolean
}
function UserIcons({ isMobile }: Props) {
  // const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  const [isLoggend, setIsLoggend] = useState<any>();
  const [wishListLength, setWishListLength] = useState<number>(2);


  useEffect(() => {
    const user: any = localStorage.getItem("user_role");
    if (user != undefined) {
      if (JSON.parse(user) == "admin") {
        setIsAdmin(true);
      }
      setIsLoggend(true);
    }
  }, []);

  // Log Out
  const handleLogOut = async () => {
    setOpenLogOut(false)
    setIsLoading(true);

    try {

      await LogOut();
      notification.success({
        message: "logout_success",
      });

      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 100);
      router.push("/");

    }
    catch (err: any) {
      console.log(err)
      notification.error({
        message: err.response.data.message,
      });
    }
    finally {
      setIsLoading(false);
      setOpenLogOut(false)
    };
  };

  const profile_items = [
      {
        label: "profile",
        key: "1",
        icon: <FaUserAlt className=" text-sm text-[#8c8c8c]" />,
        url: `/user-profile`,
      },
    {
      label: "logout",
      key: "2",
      icon: <CiLogin className=" text-xl text-[#8c8c8c]" />,
    },
  ];

  const [isHoveredOnProfileIcon, setIssHoveredOnProfileIcon] = useState(false);

  const handleMouseEnterOnProfileIcon = () => {
    setIssHoveredOnProfileIcon(true);
  };

  const handleMouseLeaveOnProfileIcon = () => {
    setIssHoveredOnProfileIcon(false);
  };


  return (
    <main className="">
      {isLoading && <Loader />}
      <div className="flex items-center justify-between gap-5">

        {/* Start Profile Icon */}
        <div className=" felx flex-col justify-center items-center relative  !z-[99999999] hover:scale-110 transition-all duration-200 ">
          {isLoggend ? (
            <div
              className="flex items-center flex-col relative cursor-pointer mt-[2px]"
              onMouseEnter={handleMouseEnterOnProfileIcon}
              onMouseLeave={handleMouseLeaveOnProfileIcon}
            >
              <FaUserAlt className=" text-xl text-[#8c8c8c]" />
              <span className=" hidden lg:block text-sm mt-[2px] text-center">
                Profile
              </span>

              <ul
                className={`absolute !z-[99999999] top-[70px] -left-[46px] w-36 p-2 px-4 bg-gray-50 rounded-md  transition-all duration-300  before:block before:absolute before:border-8 before:border-t-transparent before:border-r-transparent before:border-b-[#f1f1f1] before:border-l-transparent before:-top-[15px] before:right-[46%] ${isHoveredOnProfileIcon ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
              >
                {profile_items.map((item) => (
                  <li
                    key={item.key}
                    className=" border-b-[1px] border-[#006496] py-3 px-1 cursor-pointer transition-all duration-200 hover:scale-105 "
                  >
                    {item.url ? (
                      <Link
                        href={`${item.url}`}
                        className=" flex items-center justify-center gap-1"
                      >
                        {item.icon}
                        <span className="mr-2 text-xs text-[#8c8c8c]">
                          {item.label}
                        </span>
                      </Link>
                    ) : (
                      <div
                        className=" flex items-center justify-center gap-1"
                        onClick={() => {
                          setOpenLogOut(true);
                        }}
                      >
                        {item.icon}
                        <span className="mr-2 text-xs text-[#8c8c8c]">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

            </div>
          ) : (
            <div className="ml-1">
              <Link href="/auth/login" className="flex flex-col items-center">
                <FaUserAlt className=" text-xl text-[#8c8c8c]" />
                <span className=" hidden lg:block mt-[4px] text-center text-sm">
                  Login
                </span>
              </Link>
            </div>
          )}
        </div>
        {/* End Profile Icon */}

        {/* Start wishList Icon */}
        <div className="w-16 flex items-center justify-center flex-col relative hover:scale-110 transition-all duration-200 ">
          <span className="text-[11px] absolute -top-[2px] left-[20%] bg-[#006496] text-white rounded-lg p-[2px] px-[6px]">
            {wishListLength}
          </span>
          <Link
            href="/wishList"
            className="cursor-pointer flex flex-col items-center justify-center "
          >
            <MdFavorite className="w-7 h-7 text-[#8c8c8c]" />
            <p className="hidden lg:block text-sm text-center">
              wishlist
            </p>
          </Link>
        </div>
        {/* End WishList Icon */}

        {/* Start Cart Icon */}
        {!isAdmin &&
          <div className=" hover:scale-110 transition-all duration-200 ">
            <Link
              href={`/cart`}
              className="flex !flex-col justify-center items-center "
            >
              <IoMdCart className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-center text-sm">Cart</p>
            </Link>
          </div>}
        {/* End WishList Icon */}

        {/* Start DashBoard Icon */}
        {isAdmin &&
          (<div className=" hover:scale-110 transition-all duration-200 ">
            <Link
              href={`${isAdmin ? "/admin" : "/employee"}`}
              className="flex !flex-col justify-center items-center "
            >
              <GrUserAdmin className="text-xl cursor-pointer text-[#8c8c8c]" />
              <p className="hidden lg:block mt-1 text-sm text-center">
                Dashboard
              </p>
            </Link>
          </div>
          )}
        {/* End Dashboard Icon */}

      </div>

      <Modal
        title="Do You Want LogOut"
        centered
        open={openLogOut}
        onOk={() => { handleLogOut() }}
        okButtonProps={{ style: { backgroundColor: '#4096ff', zIndex: "99999999999999999999" } }}
        onCancel={() => { setOpenLogOut(false); }}
        width={400}
      />

    </main>
  );
}

export default UserIcons;

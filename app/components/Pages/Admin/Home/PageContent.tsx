import React from 'react'
import AdminItems from '@/app/components/Global/AdminItems/AdminItems'
function AdminHome() {
  const Items = AdminItems()

  return (
    <div className=" mx-auto">
      {Items.map((item: any) => (
        <div
          key={item.key}
          className="my-2"
        >
          {typeof item.label !== "string" ? (
            <div  className='py-3 border-2 md:w-1/2 w-1/3 text-lg border-gray-300 rounded-md flex items-center justify-center gap-2 hover:scale-110 duration-150'>
              {item.label}  {item.icon}
            </div>
          ) : (
            item.children?.map((child: any) => (
              <div
                key={child.key}
                className="py-3 my-2 md:w-1/2 w-1/3 text-lg   border-2 border-gray-300 rounded-md flex items-center justify-center gap-2  hover:scale-110 duration-150"
              >
                {child.label}
                {child.icon}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminHome

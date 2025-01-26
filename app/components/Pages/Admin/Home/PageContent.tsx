import React from 'react'
import AdminItems from '@/app/components/Global/AdminItems/AdminItems'
import Link from 'next/link'
function AdminHome() {
  const Items = AdminItems()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-3">
      {Items.map((item: any) => (
        <div key={item.key} className="border-2 border-gray-300 rounded-md flex-row items-center justify-center">
          {typeof item.label !== "string" ? (
            <Link href={item.url}>{item.label}</Link>
          ) : (
            <div>
              {item.children?.map((child:any) => (
                <div key={child.key} className="  border-2 border-gray-300 rounded-md flex items-center justify-center">
                  {child.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AdminHome

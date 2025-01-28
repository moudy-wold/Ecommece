import EditProduct from '@/app/components/Pages/Admin/Products/EditProduct/EditProduct'
import React from 'react'

interface PageParams {
  id: string;
}

export default async function Page({ params: { id } }: { params: PageParams }) {

  return (
    <div>
      <EditProduct product_id={id} />
    </div>
  )
}


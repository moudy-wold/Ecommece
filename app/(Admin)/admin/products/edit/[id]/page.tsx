import EditProduct from '@/app/components/Pages/Admin/Products/EditProduct/EditProduct'
import React from 'react'

interface PageParams {
  id: string;
}

export default async function Page({ params }: { params: any }) {
  const { id } = params;

  return (
    <div>
      <EditProduct product_id={id} />
    </div>
  )
}
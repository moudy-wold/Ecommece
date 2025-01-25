import EditProduct from '@/app/components/Pages/Admin/Products/EditProduct/EditProduct'
import React from 'react'

type Props = {
  params: { id: string };
};

export default async function Page({ params: { id } }: Props) {

  return (
    <div>
      <EditProduct product_id={id} />
    </div>
  )
}


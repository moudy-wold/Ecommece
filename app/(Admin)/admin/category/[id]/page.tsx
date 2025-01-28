import ProductsList from "@/app/components/Pages/Admin/Products/PageContent";

interface PageParams {
    id?: string;
}

export default async function Page({ params: { id } }: any) {
    return (
        <div>
            <ProductsList category_id={id} />
        </div>
    )
}
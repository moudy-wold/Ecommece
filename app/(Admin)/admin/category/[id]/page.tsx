    import ProductsList from "@/app/components/Pages/Admin/Products/PageContent";

type Props = {
    params: any;
};

export default async function Page({ params }: any) {
    const { id } = await params;
    return (
        <div>
            <ProductsList category_id={id} />
        </div>
    )
}
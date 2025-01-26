    import ProductsList from "@/app/components/Pages/Admin/Products/PageContent";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    return (
        <div>
            <ProductsList category_id={id} />
        </div>
    )
}
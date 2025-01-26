import { GetAllCategories } from "./api/Front/categories";
import HomePage from "./components/Pages/MainLayout/Home/PageContent";

export default async function Home() {
  const data = await GetAllCategories()

  const branch_sliderData = [
    { image: "https://alhaddadshop.com/images/thumbs/0042487.jpeg" },
    { image: "https://alhaddadshop.com/images/thumbs/0042404.jpeg" },
    { image: "https://alhaddadshop.com/images/thumbs/0042999.jpeg" },
  ]
  const main_sliderData = [
    { image: "https://alhaddadshop.com/images/thumbs/0040497.jpeg" },
    { image: "https://alhaddadshop.com/images/thumbs/0042990.jpeg" },
    { image: "https://alhaddadshop.com/images/thumbs/0042991.jpeg" },

  ]
  return (
    <div className="">
      <HomePage products_data={data.data} main_sliderData={main_sliderData} branch_sliderData={branch_sliderData} />
    </div>
  );
}

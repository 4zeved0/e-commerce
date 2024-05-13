import Product from "./components/Product"
import { fetchProducts } from "./action"
import { InfinityScroll } from "./components/InfinityScroll";

export default async function Home() {
  try {
    const { formatedProducts } = await fetchProducts({});
    if (!formatedProducts) {
      throw new Error('Failed to fetch products');
    }
    return (
      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          <InfinityScroll initialProducts={formatedProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Failed to load products</div>;
  }
}

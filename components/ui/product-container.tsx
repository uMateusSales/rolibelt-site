"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import useWindowDimensions from "@/hooks/use-window";
import ButtonAddToCart from "./buttonAddToCart";

interface ProductContainerProps {
  data: Product;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ data }) => {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();
  const { width, height } = useWindowDimensions();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };
  const addToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  const hideButtons = () => {
    if (width !== undefined && width < 600) {
      return false;
    } else return true;
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group h-[500px] md:h-[550px] cursor-pointer rounded-xl border border-red-300 p-3 space-y-4 shadow-md hover:border-transparent "
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="imagem do produto"
          className="aspect-square object-cover rounded-md shadow-sm"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/OXbJgAJUAORqZ+bhAAAAABJRU5ErkJggg=="
        />
        {hideButtons() && (
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <div className="flex items-center bg-slate-100 rounded-md p-1">
                <IconButton
                  onClick={onPreview}
                  icon={<Expand size={20} className="text-gray-700" />}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col mb-0 gap-0">
        <div className="flex flex-col font-semibold  gap-1 mb-2">
          <p className=" text-zinc-900 sm:text-base md:text-lg">{data.name}</p>
          <p className="text-sm text-zinc-600 mt-2">{data.category.name}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Currency value={data.price} />
          <div className="flex gap-3 items-center">
            <span> Custo por unidade </span>
            <Currency value={Number(data.price) / 50} />
          </div>
          <ButtonAddToCart
            className="text-xs sm:text-sm p-2 max-h-8 space-y-2 mt-5"
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;

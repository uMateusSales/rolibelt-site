import React, { Suspense } from "react";

import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboards";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";
import ContactUs from "@/components/ContactUs";
import { Separator } from "@/components/ui/separator";

export const revalidate = 9000;

const HomePage = async () => {
  const billboard = await getBillboard("777e2b4c-8605-4da7-85c1-53e580c7897d");
  const produtos = await getProducts({
    storeId: "a617f7e9-0a25-423a-81f0-91aed35f0442",
  });

  return (
    <Container>
      <div className="space-y-10 pb-10 ">
        <Billboard data={billboard} />

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Produtos disponiveis" items={produtos} />
        </div>
        <Separator className="h-0.5 rounded mx-1" orientation="horizontal" />
        <ContactUs />
      </div>
    </Container>
  );
};

export default HomePage;

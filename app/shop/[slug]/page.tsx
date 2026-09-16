import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import PageTransition from '@/components/PageTransition';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Kiyim topilmadi',
    };
  }

  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AURELIN`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1500,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <PageTransition className="w-full py-12 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <ProductDetailClient product={product} />
      </div>
    </PageTransition>
  );
}

'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { postEvent } from '@telegram-apps/sdk-react';
import { ArrowUpRight, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { catalogApi } from '#api/catalog';

import { generateShareCardDeeplink, getLocalisedValue } from '#core/helpers';

import { cn } from '#lib/utils';

import { CardsList } from '#components/catalog/cards-list/common';
import { ProductCardContent } from '#components/catalog/product-card-content';
import { ProductGallery } from '#components/catalog/product-gallery';
import { PageLayout } from '#components/layout/page';

import { ProductCardLoader } from '#ui/loaders';
import { SocialLink } from '#ui/social-link';

export default function ProductPage() {
    const params = useParams<{ productId: string }>();
    const { productId } = params;

    const {
        data,
        isLoading,
        isFetched: productIsFetched,
    } = useQuery({
        queryKey: ['getProduct', productId],
        queryFn: () => catalogApi.getCard({ id: Number(productId) }),
        enabled: !!productId,
    });

    const [isFavorite, setIsFavorite] = useState(false);

    const onHapticClick = () => {
        postEvent('web_app_trigger_haptic_feedback', {
            type: 'impact',
            impact_style: 'soft',
        });
    };

    useEffect(() => {
        if (data?.is_favorite !== undefined) {
            setIsFavorite(data.is_favorite);
        }
    }, [data?.is_favorite]);

    const categoryIds = useMemo(() => data?.category.map((c) => Number(c.id)), [data?.category]);

    const { data: relatedProductList, isLoading: relatedProductListLoading } = useQuery({
        queryKey: ['relatedProductList', categoryIds],
        queryFn: () =>
            catalogApi.getCardsList({
                category_id: categoryIds,
                limit: 4,
                order: 'RANDOM',
            }),
        enabled: productIsFetched && categoryIds && categoryIds.length > 0,
    });

    const mutation = useMutation({
        mutationKey: ['favorite', { card_id: Number(productId) }],
        mutationFn: () =>
            catalogApi.favorite({
                card_id: Number(productId),
                action: data?.is_favorite ? 'REMOVE' : 'ADD',
            }),
    });

    if (isLoading) {
        return (
            <PageLayout>
                <ProductCardLoader />
            </PageLayout>
        );
    }

    if (!data) return null;

    const shareLink = generateShareCardDeeplink(productId);

    return (
        <PageLayout>
            <div className="relative h-80 -mx-5">
                <ProductGallery images={data.medias.map((media) => media.url)} />
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-5">
                    {data.socials?.map((social) => (
                        <SocialLink key={social.domain} domain={social.domain} url={social.url} />
                    ))}
                </div>
                <div className="flex items-center gap-2.5">
                    <Heart
                        className={cn(isFavorite && 'fill-blue stroke-blue')}
                        onClick={() => {
                            onHapticClick();
                            setIsFavorite((prevState) => !prevState);
                            mutation.mutate();
                        }}
                    />
                    <a href={shareLink} onClick={onHapticClick}>
                        <Share2 />
                    </a>
                </div>
            </div>
            <div className="my-5 text-2xl font-medium">
                <div>{getLocalisedValue(data.title)}</div>
                <div className="text-blue">
                    {data.price_value} {data.currency}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2.5">
                {data.category.map((c) => (
                    <Link
                        href={`/category/${c.id}`}
                        key={c.id}
                        className="inline-block bg-blue z-10 rounded p-2.5 text-sm leading-3"
                    >
                        {getLocalisedValue(c.title)}
                    </Link>
                ))}
            </div>

            {/*<div className="inline-block border border-blue bg-blue/20 rounded-lg py-4 px-3 w-[200px] text-center text-base font-bold">*/}
            {/*    ASK GPT*/}
            {/*</div>*/}
            <div className="mt-5 mb-2.5 text-2xl font-medium">Description</div>
            <ProductCardContent text={getLocalisedValue(data.description_full)} />
            {relatedProductList?.list && (
                <>
                    <div className="my-5 text-2xl font-medium">Related cards</div>
                    <CardsList
                        products={relatedProductList.list}
                        isLoading={relatedProductListLoading}
                    />
                </>
            )}
            <div className="h-[80px]" />
            <div className="fixed z-10 bottom-[120px] left-0 px-5 w-screen flex justify-center">
                <Link
                    target="_blank"
                    href={data.payload_url}
                    className="max-w-[500px] w-full flex items-center justify-center p-4 text-18 text-white bg-greenSecondary rounded-10 gap-2.5 font-medium"
                >
                    <ArrowUpRight /> Launch
                </Link>
            </div>
        </PageLayout>
    );
}

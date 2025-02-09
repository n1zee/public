import type { Paginate } from '@/types/paginate';

export interface Brand {
    id: number;
    name: string;
    description?: string | null;
    logo: string;
    cashback: number;
    bonus: string;
    referral_link: string;
    order: number;
    is_premium: boolean;
    is_active: boolean;
    categories?: string[];
    hash: string;
}

export type BrandPaginated = Paginate<Brand>;

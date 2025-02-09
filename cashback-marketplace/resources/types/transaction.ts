import type { Money } from '@/types/money';

export type TransactionType = 'receive' | 'withdraw';

export interface Transaction {
    id: number;
    type: TransactionType;
    money: Money;
    date: string;
    isAccepted: boolean;
    note?: string;
}

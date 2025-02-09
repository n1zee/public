export interface AccountDetails {
    accountId: string;
    isApproved: boolean;
    approveDate?: string;
}

export interface Account {
    id: number;
    name: string;
    logo: string;
    details: AccountDetails;
}

/* eslint-disable */
// [Warning] Generated automatically - do not edit manually

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};
export type Paginate = {
    paginateInfo: {
        totalItems: number;
        totalPages: number;
    };
    paginateMeta: {
        currentPage: number;
        pageLimit: number;
    };
};
export type TransactionType = {
    code: "deposit" | "withdrawal";
    name: string;
};
export type TransactionStatus = {
    code: string;
    name: string;
};
export type AddressMap = {
    city: {
        code: string;
        name: string;
    };
    district: {
        code: string;
        name: string;
    };
    detail: string;
};
export type ResponseMessage = {
    message: string;
};
export type CodeNameMap = {
    code: string;
    name: string;
};
export type IdNameMap = {
    id: string;
    name: string;
};
export type SmsCodeVeify = {
    id: string;
    value: string;
};
export type TransactionRow = {
    id: string;
    transactionType: "deposit" | "withdrawal";
    statusCode: "pending" | "success" | "fail";
    amount: number;
    createdAt: string;
};
export type DeviceType = "mobile" | "desktop";
export type BadResponse = {
    code: string;
    message: string;
    formMessage?: {
        column: string;
        message: string[];
    }[];
};
export type HistoryPointData = {
    id: string;
    transactionType: TransactionType;
    amount: number;
    createdAt: string;
};
export type HistoryBetData = {
    id: string;
    lobbyName: string;
    /** 輸贏金額 */
    winLossAmount: number;
    /** 有效投注 amount */
    validBetAmount: number;
    betAmount: number;
};
export type HistoryPayoutData = {
    id: string;
    amount: number;
    createdAt: string;
};

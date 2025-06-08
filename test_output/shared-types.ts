export type PaginateMeta = {
    /** 目前頁面 */
    currentPage: number;
    /** 一次顯示幾筆 */
    pageLimit: number;
};
export type PaginateInfo = {
    /** 總筆數 */
    totalItems: number;
    /** 總頁數 */
    totalPages: number;
};
export type AuditRows = {
    id: string;
    /** 老闆名稱 */
    operatorName: string;
    /** 狀態 */
    status: string;
    /** 站點名稱 */
    stationName: string;
    /** 區域名稱 */
    areaName: string;
    /** 建立日期 */
    auditDate: string;
    /** 現場人員是否簽名 */
    isManagerSignature: boolean;
    /** 觀察員是否已簽名 */
    isAuditSignature: boolean;
    /** 老闆是否已簽名 */
    isOperatorSignature: boolean;
    /** 更新者名稱 */
    updaterName: string;
    /** 更新時間 */
    updatedAt: string;
};
export type Param = {
    /** 代碼 */
    code: string;
    /** 名稱 */
    name: string;
};
export type OperatorRows = {
    /** ID */
    id: string;
    /** 老闆名稱 */
    name: string;
    /** 文件審核密碼 */
    viewPassword: string;
};
export type AuditDetail = {
    /** 老闆名稱 */
    operatorName: string;
    /** 站點名稱 */
    stationName: string;
    /** 觀察日期 */
    auditDate: string;
    /** 區域名稱 */
    areaName: string;
    /** 區域代碼 */
    areaCode: string;
    /** 備註 */
    remark: string;
    /** 觀察員簽名檔網址 */
    auditSignatureUrl: string;
    /** 現場人員簽名檔網址 */
    managerSignatureUrl: string;
    /** 老闆簽名檔網址 */
    operatorSignatureUrl: string;
    /** 題目清單 */
    questions: {
        /** 題目 ID */
        qId: string;
        /** 題目類別描述 */
        description?: string;
        /** 是否已完成 */
        isDone: boolean;
        /** 題目內容 (含 HTML 標籤) */
        content: string;
        /** 選項附件上傳模式 (1：不限、2：單檔、3：多檔)  */
        attachMode: number;
        /** 顯示順序 */
        order: number;
        /** 答題選項 */
        options?: {
            /** 選項 ID */
            optId: string;
            /** 選項類型 ( 1：單選、2：複選 / 含單個核選框、3：文字-純文字、4：文字-複合文字) */
            "type": number;
            /** 選項文字 */
            label?: string;
            /** 選項值 */
            value: string;
            /** 選項顯示順序 */
            order: number;
        }[];
        /** 已填寫答案 */
        value: AuditDetailValue;
        /** 附件 */
        annex?: AuditDetailAnnex[];
    }[];
};
export type AuditDetailValue = {
    /** 單選值 */
    single?: string | null;
    /** 多選值 */
    multiple?: string[] | null;
    /** 純文字 */
    plainTxt?: string | null;
    /** 複合文字 (依複合文字順序依序填入) */
    richTxt?: string[] | null;
};
export type AuditDetailAnnex = {
    /** 檔案代碼 */
    fId: string;
    /** 開啟位置 */
    src: string;
    /** 檔名 */
    name: string;
    /** 媒體類型 */
    mime: string | null;
    /** 顯示順序 */
    order: number;
};
export type UpdateAuditQuestion = {
    /** 題目代碼 */
    qId: string;
    /** 單選答案值 */
    valueSingle?: string;
    /** 多選答案值 (字串陣列) */
    valueMultiple?: string[];
    /** 純文字答案值 */
    valuePlainTxt?: string;
    /** 複合文字答案值 (字串陣列) */
    valueRichTxt?: string[];
    /** 檔案附件 */
    annex?: Blob;
};

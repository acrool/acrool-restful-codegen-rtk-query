export type Pet = {
    /** 宠物ID编号 */
    id: number;
    /** 分组 */
    category: Category;
    /** 名称 */
    name: string;
    /** 照片URL */
    photoUrls: string[];
    /** 标签 */
    tags: Tag[];
    /** 宠物销售状态 */
    status: Status;
};
export type Category = {
    /** 分组ID编号 */
    id?: number;
    /** 分组名称 */
    name?: string;
};
export type Tag = {
    /** 标签ID编号 */
    id?: number;
    /** 标签名称 */
    name?: string;
};
export type Admin = {
    authStatus?: AuthStatus;
    boIpWhiteList?: string[];
    createAccount?: string;
    createDevice?: string;
    createIP?: string;
    createTime?: string;
    errorTimes?: number;
    forceAuthSetting?: boolean;
    id?: string;
    lastLoginIP?: string;
    lastLoginTime?: string;
    mail?: string;
    mailVerify?: boolean;
    manualTransfer?: ManualTransfer;
    modifyTime?: string;
    mustChangePassword?: boolean;
    nickname?: string;
    password?: string;
    resetCode?: string;
    roleList?: ObjectId[];
    secretKey?: string;
    status?: string;
    verifyToken?: string;
};
export type AdminAccountRequestVO = {
    /** 帳號 */
    account: string;
};
export type AdminHistoryVO = {
    /** 帳號 */
    account?: string;
    /** 帳號身份 */
    accountIdentity?: AccountIdentity;
    /** 建立時間 */
    createTime?: string;
    /** 異動內容 */
    detail?: string;
    /** ID */
    id?: string;
    /** 來源 IP */
    ip?: string;
    /** 功能 */
    menu?: string;
    /** 操作人員 */
    operator?: string;
    /** 操作身份 */
    operatorIdentity?: OperatorIdentity;
    /** ID */
    recordIdentify?: string;
};
export type AdminLoginRequestVO = {
    /** 帳號 */
    account: string;
    /** 密碼 */
    password: string;
};
export type AdminLoginResponseVO = {
    /** null or PASS : 不需進入二階段驗證, WAIT_TWO_PHASES : 需二階段驗證 */
    authStatus?: AuthStatus2;
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 綁定二次驗證 */
    forceAuth?: boolean;
    /** 是否必須修改密碼 */
    mustChangePassword?: boolean;
    /** 是否成功 */
    success?: boolean;
    /** Token */
    token?: string;
};
export type AdminVO = {
    /** 帳號 */
    account?: string;
    /** 是否已綁定登入驗證 */
    authStatus?: boolean;
    /** 加入時間 */
    createTime?: string;
    /** 綁定二次驗證 */
    forceAuth?: boolean;
    /** 最後登入 IP */
    lastLoginIP?: string;
    /** 最後登入時間 */
    lastLoginTime?: string;
    /** 信箱 */
    mail?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    /** 暱稱 */
    nickname?: string;
    /** 角色 */
    roles?: string[];
    /** 狀態 */
    status?: Status2;
};
export type AdminVerifyMailLinkRequestVO = {
    /** 令牌 */
    token: string;
};
export type BaseResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type BetLimit = {
    betMax?: number;
    betMin?: number;
    gameId?: string;
    gameType?: string;
    id?: ObjectId;
    memberLevelSettingIds?: string[];
};
export type BetRecordVO = {
    /** 帳號 */
    account?: string;
    /** 注單號碼 */
    bankId?: string;
    /** 投注額 */
    bet?: number;
    /** 投注時間 */
    betTime?: string;
    /** 是否為自訂遊戲 */
    customGame?: boolean;
    /** 遊戲 ID */
    gameId?: string;
    /** 遊戲類型 */
    gameType?: string;
    /** ID */
    id?: string;
    /** 會員等級 */
    memberLevel?: number;
    /** 暱稱 */
    nickname?: string;
    /** 是否未派彩 */
    noPrize?: boolean;
    /** 遊戲平台 */
    platform?: string;
    /** 匯率 */
    rate?: number;
    /** 注單狀態 (無異動 = normal, 取消派彩 = void_settle, 重置派彩 = unsettle) */
    recordAction?: RecordAction;
    /** 局號 */
    recordId?: string;
    /** 結算時間 */
    settleTime?: string;
    /** 娛樂城 */
    supplier?: string;
    /** 有效投注 */
    validBet?: number;
    /** VIP層級 */
    vipGradeSetting?: string;
    /** 贏分 */
    win?: number;
    /** 輸贏 */
    winLose?: number;
};
export type BlobVO = {
    /** Storage */
    bucket?: string;
    /** 內容 */
    content?: string;
    metadata?: Map;
    /** 檔名 */
    name?: string;
};
export type CallbackStatus = "PENDING" | "SUCCESS" | "WAITING" | "FAILURE";
export type CountInfo = {
    /** 數量 */
    count?: number;
    /** 差額 */
    diff?: number;
};
export type CreateAdminRequestVO = {
    /** 帳號 */
    account: string;
    /** 是否設定強制綁定驗證 */
    forceAuth?: boolean;
    /** 信箱 */
    mail?: string;
    /** 暱稱 */
    nickname: string;
    /** 角色 ID */
    roleList: string[];
};
export type CreateAdminResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 密碼 */
    password?: string;
    /** 是否成功 */
    success?: boolean;
};
export type CreateManualTransactionMemberDepositRequestVO = {
    /** 帳號 */
    account: string;
    /** 動作 */
    action: Action;
    /** 稽核金額 */
    auditPoint?: number;
    /** 稽核類型 */
    auditType?: AuditType;
    /** 備註 */
    memo?: string;
    /** 金額 */
    point: number;
    /** 使用者備註 */
    userMemo?: string;
};
export type CreateManualTransactionMemberDepositResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 停用或凍結帳號清單 */
    disableOrFreezeAccountList?: string[];
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type CreateMemberRequestVO = {
    /** 生日 */
    birthday?: string;
    /** 國碼 */
    countryCode?: string;
    /** 名 */
    firstName?: string;
    /** 姓 */
    lastName?: string;
    /** 信箱 */
    mail?: string;
    /** 帳號 */
    memberAccount: string;
    /** 備註 */
    memo?: string;
    /** 暱稱 */
    nickName: string;
    /** 手機 */
    phone?: string;
    /** 性別 */
    sex?: string;
};
export type CreatePaymentTypeSettingRequestVO = {
    /** 圖片 */
    imageList?: ImageObj[];
    /** 備註 */
    memo?: string;
    nameMap?: NameMap;
    /** 排序 */
    sort?: number;
    /** 狀態 */
    status: Status3;
    /** 類型 */
    "type": string;
};
export type DateColumn = {
    bet?: KanbanDetailVo;
    date?: string;
    validBet?: KanbanDetailVo;
    winLose?: KanbanDetailVo;
};
export type DeleteMemberLevelSettingRequestVO = {
    /** 押注限額設定 */
    betLimits?: string[];
    /** 累計押注門檻 */
    betsConversion?: number;
    /** 累計押注達標經驗值 */
    betsExp?: number;
    /** ID */
    id: string;
    /** 排序 */
    index?: number;
    /** 等級迄 */
    levelMax?: number;
    /** 等級起 */
    levelMin?: number;
    /** 累計經驗值門檻 */
    levelUpExp?: number;
    /** 每日登入經驗值 */
    loginExp?: number;
    /** 累計儲值門檻 */
    topUpConversion?: number;
    /** 累計儲值達標經驗值 */
    topUpExp?: number;
    /** 單次儲值限制 */
    topUpLimit?: number;
    upgradeRewards?: UpgradeRewards;
};
export type GameNameDetail = {
    /** 遊戲代號 */
    gameId?: string;
    gameNameMap?: NameMap;
    /** 遊戲類型 */
    gameType?: string;
    /** 圖片清單 */
    imageList?: string[];
};
export type GameTypeVO = {
    /** 遊戲類型 */
    gameTypeList?: string[];
    /** 遊戲平台 */
    platform?: string;
};
export type HotInfoResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    deposit?: PointInfo;
    /** 錯誤訊息 */
    errorMessage?: string;
    online?: CountInfo;
    payoff?: PointInfo;
    register?: CountInfo;
    /** 是否成功 */
    success?: boolean;
};
export type ImageObj = {
    /** 主題 */
    theme?: string;
    /** 圖片 URL */
    urlList?: string[];
};
export type KanbanDetailVO = {
    /** 金額 */
    amount?: number;
    /** 筆數 */
    count?: number;
    /** 人數 */
    people?: number;
};
export type LoginLogVO = {
    /** 帳號 */
    account?: string;
    /** 瀏覽器名稱 */
    browser?: string;
    /** 瀏覽器版本 */
    browserVersion?: string;
    /** 城市 */
    city?: string;
    /** 國家 */
    country?: string;
    /** 登入時間 */
    createTime?: string;
    /** 裝置 */
    device?: string;
    /** 來源網址 */
    domain?: string;
    /** ID */
    id?: string;
    /** 身份 */
    identity?: Identity;
    /** 來源 IP */
    loginIp?: string;
    /** 暱稱 */
    nickName?: string;
    /** 區域 */
    region?: string;
    /** 系統平台 */
    systemName?: string;
    /** ISP */
    telecom?: string;
};
export type ManualTransfer = {
    /** 單月 */
    limitEveryMonth?: number | null;
    /** 單次 */
    limitEveryTime?: number | null;
    /** 單週 */
    limitEveryWeek?: number | null;
    /** 總額 */
    totalLimit?: number | null;
};
export type MemberAccountRequestVO = {
    /** 帳號 */
    memberAccount: string;
};
export type MemberInfoCheckExistVO = {
    /** 信箱是否存在 */
    mailExist?: boolean;
};
export type MemberInfoCheckSendVO = {
    /** 是否有發送驗證信件 */
    sendMail?: boolean;
};
export type MemberInfoExistListVO = {
    /** 信箱 相同的帳號列表 */
    mailExistAccounts?: string[];
};
export type MemberInfoVO = {
    checkExist?: MemberInfoCheckExistVo;
    checkSend?: MemberInfoCheckSendVo;
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    existList?: MemberInfoExistListVo;
    /** 是否成功 */
    success?: boolean;
};
export type MemberItem = {
    /** 帳號 */
    account?: string;
    /** 生日 */
    birthday?: string;
    /** 點數 */
    cash?: number;
    /** 國碼 */
    countryCode?: string;
    /** 註冊裝置 */
    createDevice?: string;
    /** 註冊網址 */
    createDomain?: string;
    /** 註冊IP */
    createIP?: string;
    /** 方式 */
    createMethod?: string;
    /** 註冊時間 */
    createTime?: string;
    /** 首存點數 */
    firstDepositCash?: number;
    /** 首存時間 */
    firstDepositTime?: string;
    /** 錢包帳號 */
    gameAccounts?: string[];
    /** 最後投注時間 */
    lastBetTime?: string;
    /** 最後儲值時間 */
    lastDepositTime?: string;
    /** 最後登入 IP */
    lastLoginIp?: string;
    /** 最後登入地區 */
    lastLoginRegion?: string;
    /** 最後登入時間 */
    lastLoginTime?: string;
    /** 會員層級 */
    level?: number;
    /** 信箱 */
    mail?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    /** 手機號 */
    mobilePhone?: string;
    /** 暱稱 */
    nickName?: string;
    /** 手機 */
    phone?: string;
    /** 遊戲幣 */
    point?: number;
    /** 性別 */
    sex?: string;
    /** 手機驗證 */
    smsVerify?: boolean;
    /** 狀態 */
    status?: Status4;
    /** 總獎金 */
    totalBonus?: number;
    /** 總儲值點數 */
    totalDepositCash?: number;
    /** 總儲值次數 */
    totalDepositCount?: number;
    /** 總贈點次數 */
    totalSendCount?: number;
    /** 總贈點點數 */
    totalSendPoint?: number;
    /** VIP等級設定 */
    vipGradeSetting?: string;
    /** VIP等級設定ID */
    vipGradeSettingId?: string;
};
export type MemberLevelSettingRequestVO = {
    /** 押注限額設定 */
    betLimits?: string[];
    /** 累計押注門檻 */
    betsConversion?: number;
    /** 累計押注達標經驗值 */
    betsExp?: number;
    /** ID */
    id?: string;
    /** 排序 */
    index?: number;
    /** 等級迄 */
    levelMax?: number;
    /** 等級起 */
    levelMin: number;
    /** 累計經驗值門檻 */
    levelUpExp?: number;
    /** 每日登入經驗值 */
    loginExp?: number;
    /** 累計儲值門檻 */
    topUpConversion?: number;
    /** 累計儲值達標經驗值 */
    topUpExp?: number;
    /** 單次儲值限制 */
    topUpLimit?: number;
    upgradeRewards?: UpgradeRewards;
};
export type MemberLevelSettingResponseVO = {
    /** 押注限額設定 */
    betLimits?: BetLimit[];
    /** 累計押注門檻 */
    betsConversion?: number;
    /** 累計押注達標經驗值 */
    betsExp?: number;
    /** ID */
    id?: string;
    /** 等級迄 */
    levelMax?: number;
    /** 等級起 */
    levelMin?: number;
    /** 累計經驗值門檻 */
    levelUpExp?: number;
    /** 每日登入經驗值 */
    loginExp?: number;
    /** 會員數 */
    memberCount?: number;
    /** 累計儲值門檻 */
    topUpConversion?: number;
    /** 累計儲值達標經驗值 */
    topUpExp?: number;
    /** 單次儲值限制 */
    topUpLimit?: number;
    upgradeRewards?: UpgradeRewards;
    /** VIP層級 */
    vipGrade?: string;
};
export type MemberPasswordResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 密碼 */
    password?: string;
    /** 是否成功 */
    success?: boolean;
};
export type Method = "CREDIT_CARD" | "SERIAL_NUMBER";
export type ObjectId = {
    date?: string;
    timestamp?: number;
};
export type PaymentRecordVO = {
    /** 帳號 */
    account?: string;
    /** 帳號身份 */
    accountIdentity?: AccountIdentity2;
    /** 金額 */
    cash?: number;
    /** 儲值商戶 */
    cashSetting?: string;
    /** 儲值商戶 ID */
    cashSettingId?: string;
    /** 申請時間 */
    createTime?: string;
    /** 首儲 */
    firstDeposit?: boolean;
    /** 單號 */
    id?: string;
    manualEnable?: boolean;
    /** 會員等級 */
    memberLevel?: number;
    method?: Method;
    /** 處理時間 */
    modifyTime?: string;
    /** 暱稱 */
    nickname?: string;
    /** 操作人員帳號 */
    operatorAccount?: string;
    /** 操作身份 */
    operatorIdentity?: OperatorIdentity2;
    orderStatus?: CallbackStatus;
    /** 商戶單號 */
    paymentId?: string;
    /** 儲值商戶 */
    paymentType?: string;
    /** 點數 */
    point?: number;
    recordStatus?: RecordStatus;
    /** 點數卡序號 */
    serialNumber?: string;
    /** 交易單號 */
    transferRecordId?: string;
    transferType?: Type;
    /** VIP 層級 */
    vipGradeSetting?: string;
    /** VIP 層級 ID */
    vipGradeSettingId?: string;
};
export type PaymentTypeVO = {
    /** 筆數 */
    count?: number;
    /** 單號 */
    customId?: string;
};
export type PointInfo = {
    /** 數量 */
    count?: number;
    /** 差額 */
    diff?: number;
};
export type ReadAdminHistoryListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 管理員歷史紀錄 */
    data?: AdminHistoryVo[];
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    /** 總筆數 */
    total?: number;
};
export type ReadAdminListRequestVO = {
    /** 帳號 */
    accountList?: string[];
    /** 最後登入時間起迄 */
    lastLoginTime?: string[];
    /** 信箱 */
    mail?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    /** 暱稱 */
    nickname?: string;
    /** 頁碼 */
    pageIndex: number;
    /** 筆數 */
    pageSize: number;
    /** 狀態 */
    status?: Status4;
};
export type ReadAdminListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 總筆數 */
    count?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 管理員列表 */
    list?: AdminVo[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadAdminResponseVO = {
    /** 帳號 */
    account?: string;
    /** null or PASS : 不需進入二階段驗證, WAIT_TWO_PHASES : 需二階段驗證 */
    authStatus?: false | false | false;
    /** 錯誤代碼 */
    code?: number;
    /** 建立帳號 */
    createAccount?: string;
    /** 加入裝置 */
    createDevice?: string;
    /** 建立 IP */
    createIp?: string;
    /** 建立時間 */
    createTime?: string;
    /** 信箱 */
    email?: string;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 綁定二次驗證 */
    forceAuth?: boolean;
    /** 最後登入裝置 */
    lastLoginDevice?: string;
    /** 最後登入 IP */
    lastLoginIp?: string;
    /** 最後登入時間 */
    lastLoginTime?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    /** 異動時間 */
    modifyTime?: string;
    /** 暱稱 */
    nickname?: string;
    /** 角色 */
    roles?: string[];
    /** 狀態 */
    status?: Status4;
    /** 是否成功 */
    success?: boolean;
};
export type ReadBetRecordDetailResponseVO = {
    /** 帳號 */
    account?: string;
    /** 投注 */
    bet?: number;
    /** ID */
    betRecordId?: string;
    /** 投注時間 */
    betTime?: string;
    /** 錯誤代碼 */
    code?: number;
    /** 建立時間 */
    createTime?: string;
    /** 是否為自訂遊戲 */
    customGame?: boolean;
    detail?: Json;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 遊戲 ID */
    gameId?: string;
    /** 遊戲名稱 */
    gameNameMap?: {
        [key: string]: string;
    };
    /** 遊戲類型 */
    gameType?: string;
    /** JP 贏分 */
    jpWin?: number;
    /** 遊戲平台 */
    platform?: string;
    /** 結算時間 */
    settleTime?: string;
    /** 是否成功 */
    success?: boolean;
    /** 娛樂城 */
    supplier?: string;
    /** 有效投注 */
    validBet?: number;
    /** 贏分 */
    win?: number;
    /** 輸贏 */
    winLose?: number;
};
export type ReadBetRecordKanbanRequestVO = {
    /** 結束 */
    endDate: string;
    /** 前期比較 */
    extraEarlyDate?: boolean;
    findAllGameType?: boolean;
    /** 商戶遊戲類型 */
    platformGameType?: GameTypeVo[];
    queryDate?: string[];
    queryGameType?: {
        [key: string]: string[];
    };
    /** 開始時間 */
    startDate: string;
};
export type ReadBetRecordKanbanResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 清單 */
    dateList?: DateColumn[];
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    total?: DateColumn;
};
export type ReadBetRecordListResponseVO = {
    /** 投注紀錄 */
    betRecordList?: BetRecordVo[];
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    /** 總筆數 */
    totalCount?: number;
};
export type ReadBetRecordSumResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    /** 總投注 */
    totalBet?: number;
    /** 總筆數 */
    totalCount?: number;
    /** 總 JP 贏分 */
    totalJpWin?: number;
    /** 總退款 */
    totalRefund?: number;
    /** 總有效投注 */
    totalValidBet?: number;
    /** 總贏分 */
    totalWin?: number;
    /** 總輸贏 */
    totalWinLose?: number;
};
export type ReadDeviceListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    deviceList: DeviceType;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type ReadDomainSettingResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 建立時間 */
    createTime?: string;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** ID */
    id?: string;
    /** 修改時間 */
    modifyTime?: string;
    /** 域名 */
    siteList?: SiteDetail[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadLoginLogListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 登入記錄 */
    logInLogList?: LoginLogVo[];
    /** 是否成功 */
    success?: boolean;
    /** 總筆數 */
    total?: number;
};
export type ReadManualTransactionCodeListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 人工存款類型清單 */
    manualDeposit?: string[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadMemberLevelSettingListResponseVO = {
    /** 會員等級設定列表 */
    list?: MemberLevelSettingResponseVo[];
};
export type ReadMemberListRequestVO = {
    /** 帳號 */
    account?: string;
    /** 生日 */
    birthday?: string[];
    /** 國碼 */
    countryCode?: string;
    /** 建立日期 */
    createDate?: string[];
    /** 註冊裝置 */
    createDevice?: string;
    /** 註冊網址 */
    createDomain?: string;
    /** 註冊IP */
    createIp?: string;
    /** 註冊方式 */
    createMethod?: string;
    /** FacebookMail */
    facebookMail?: string;
    /** 遊戲錢包帳號 */
    gameAccount?: string;
    /** 遊戲供應商 */
    gameProvider?: string;
    /** GoogleMail */
    googleMail?: string;
    /** 會員等級 */
    level?: number;
    /** 信箱 */
    mail?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    /** 最大點數 */
    maxCash?: number;
    /** 最大遊戲幣 */
    maxPoint?: number;
    /** 最小點數 */
    minCash?: number;
    /** 最小遊戲幣 */
    minPoint?: number;
    /** 暱稱 */
    nickName?: string;
    /** 頁碼 */
    pageIndex: number;
    /** 筆數 */
    pageSize: number;
    /** 手機 */
    phone?: string;
    /** 查詢類型 */
    searchType?: string;
    /** 性別 */
    sex?: string;
    /** 手機驗證 */
    smsVerify?: boolean;
    /** 狀態 */
    status?: Status4;
    /** VIP層級 */
    vipGradeSettingId?: string;
};
export type ReadMemberListResponseVO = {
    /** 會員列表 */
    accountList?: MemberItem[];
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    /** 總點數 */
    totalCash?: number;
    /** 總筆數 */
    totalCount?: number;
    /** 總遊戲幣 */
    totalPoint?: number;
};
export type ReadMemberResponseVO = {
    /** 帳號 */
    account?: string;
    /** null or PASS : 不需進入二階段驗證, WAIT_TWO_PHASES : 需二階段驗證 */
    authStatus?: false | false | false;
    /** 限紅 */
    betLimits?: BetLimit[];
    /** 總注單筆數 */
    betRecordCount?: number;
    /** 生日 */
    birthday?: string;
    /** 錯誤代碼 */
    code?: number;
    /** 國家 */
    country?: string;
    /** 國碼 */
    countryCode?: string;
    /** 建立者 */
    createAccount?: string;
    /** 建立者國家 */
    createCountry?: string;
    /** 建立裝置 */
    createDevice?: string;
    /** 建立者身份 */
    createIdentity?: CreateIdentity;
    /** 建立者 IP */
    createIp?: string;
    /** 建立者區域 */
    createRegion?: string;
    /** 建立時間 */
    createTime?: string;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 名 */
    firstName?: string;
    /** 綁定二次驗證 */
    forceAuth?: boolean;
    /** 姓名 */
    fullName?: string;
    /** 遊戲帳號 */
    gameAccounts?: {
        [key: string]: string;
    }[];
    /** 遊戲 ID */
    gameID?: string;
    /** 遊戲類型 */
    gameType?: string;
    /** 最後注單單號 */
    lastBetRecordID?: string;
    /** 最後投注時間 */
    lastBetTime?: string;
    /** 最後登入裝置 */
    lastLoginDevice?: string;
    /** 最後登入 IP */
    lastLoginIp?: string;
    /** 最後登入時間 */
    lastLoginTime?: string;
    /** 姓 */
    lastName?: string;
    /** 會員層級 */
    level?: string;
    /** 信箱 */
    mail?: string;
    /** 會員層級 ID */
    memberLevelSettingId?: string;
    /** 備註 */
    memo?: string;
    /** 異動時間 */
    modifyTime?: string;
    /** 暱稱 */
    nickName?: string;
    /** 手機 */
    phone?: string;
    /** 遊戲平台 */
    platform?: string;
    /** 帳戶餘額 */
    point?: number;
    /** 區域 */
    region?: string;
    /** 性別 */
    sex?: string;
    /** 手機驗證 */
    smsVerify?: boolean;
    /** 狀態 */
    status?: Status4;
    /** 是否成功 */
    success?: boolean;
    /** 第三方登入帳號 */
    thirdAccounts?: {
        [key: string]: string;
    }[];
    /** 總投注金額 */
    totalBet?: number;
    /** 總有效投注 */
    totalValidBet?: number;
    verify?: boolean;
    /** VIP層級 */
    vipGradeSetting?: string;
    /** VIP層級Id */
    vipGradeSettingId?: string;
    /** 總輸贏 */
    winLose?: number;
};
export type ReadPaymentCodeResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 儲值代碼 */
    map?: {
        [key: string]: string[];
    };
    /** 是否成功 */
    success?: boolean;
};
export type ReadPaymentRecordListRequestVO = {
    /** 帳號 */
    accounts?: string[];
    /** 儲值商戶 */
    cashSettingIds?: string[];
    /** 申請時間 */
    createTime?: string[];
    /** 首儲 */
    firstDeposit?: false | true | false;
    /** 遊戲錢包帳號 */
    gameAccount?: string;
    /** 娛樂城 */
    gameProvider?: string;
    /** 單號 */
    ids?: string[];
    /** 最大金額 */
    maxCash?: number;
    /** 最大會員等級 */
    maxMemberLevel?: number;
    /** 最大點數 */
    maxPoint?: number;
    /** 儲值類型 */
    methods?: Method[];
    /** 最小金額 */
    minCash?: number;
    /** 最小會員等級 */
    minMemberLevel?: number;
    /** 最小點數 */
    minPoint?: number;
    /** 處理時間 */
    modifyTime?: string[];
    /** 暱稱 */
    nickname?: string;
    /** 操作人員帳號 */
    operatorAccount?: string;
    /** 操作人員身份 */
    operatorIdentity?: OperatorIdentity4;
    orderStatus?: CallbackStatus;
    /** 頁碼 */
    pageIndex: number;
    /** 筆數 */
    pageSize: number;
    /** 商戶單號 */
    paymentId?: string;
    /** 訂單狀態 */
    recordStatuses?: RecordStatus[];
    /** 查詢類型 */
    searchType: SearchType;
    /** 儲值卡序號 */
    serialNumber?: string;
    /** VIP 層級 */
    vipGradeSettingIds?: string[];
};
export type ReadPaymentRecordListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 收付紀錄 */
    list?: PaymentRecordVo[];
    /** 是否成功 */
    success?: boolean;
    /** 總金額 */
    totalCash?: number;
    /** 總筆數 */
    totalCount?: number;
    /** 總人數 */
    totalMember?: number;
    /** 總點數 */
    totalPoint?: number;
};
export type ReadPaymentRecordPendingResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    deposit?: PaymentTypeVo;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type ReadPersonalResponseVO = {
    /** 帳號 */
    account?: string;
    /** 錯誤代碼 */
    code?: number;
    /** 客服資訊 */
    customerService?: string;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 店鋪資訊 */
    locationList?: string[];
    /** 信箱 */
    mail?: string;
    /** 信箱驗證 */
    mailVerify?: boolean;
    mustChangePassword?: boolean;
    /** 暱稱 */
    nickname?: string;
    /** 是否成功 */
    success?: boolean;
    /** 系統時間 */
    systemTime?: string;
};
export type ReadPlatformGameTypeResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 遊戲類型詳細清單 */
    list?: PlarformGameTypeDetail[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadSettingListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    list?: string[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadSupplierListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    list?: string[];
    /** 是否成功 */
    success?: boolean;
};
export type ReadTenAccountResponseVO = {
    /** 帳號 */
    accountList: string[];
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type ReadTransferActionListResponseVO = {
    /** 交易類型 */
    actions: TransferActionVo[];
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
};
export type ReadTransferKanbanResponseVO = {
    /** 清單 */
    dateList?: DateColumn[];
    total?: DateColumn;
};
export type ReadTransferRecordListResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 總人數 */
    memberCount?: number;
    /** 是否成功 */
    success?: boolean;
    /** 總筆數 */
    totalCount?: number;
    /** 總點數 */
    totalPoint?: number;
    /** 交易紀錄 */
    transferRecordList?: TransferRecordVo[];
};
export type ReadTwoMonthsGameNameResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 遊戲類型詳細清單 */
    list?: GameNameDetail[];
    /** 是否成功 */
    success?: boolean;
};
export type RecordStatus = "PENDING" | "SUCCESS" | "FAILURE" | "CANCELED";
export type ReportColumnVO = {
    /** 欄位 */
    column?: string;
    /** 名稱 */
    name?: string;
};
export type SiteDetail = {
    apiUrls?: Map;
    /** 前後台網址 */
    url?: string;
};
export type SiteResponseVO = {
    /** 城市 */
    city: string;
    /** 客戶端 IP */
    clientIP: string;
    /** 國家 */
    country: string;
    /** 直接連結 */
    directLink: string;
    /** 網站圖示 URL */
    faviconUrl: string;
    /** 水平 Logo URL */
    hlogoUrl: string;
    /** ISP */
    isp: string;
    /** 名稱 */
    name: string;
    /** 區域 */
    region: string;
    /** 垂直 Logo URL */
    vlogoUrl: string;
    /** Widget */
    widgetCode: string;
};
export type TransferActionVO = {
    /** 類型明細 */
    list?: string[];
    /** 類型 */
    "type"?: string;
};
export type TransferRecordVO = {
    /** 帳號 */
    account?: string;
    /** 帳號身份 */
    accountIdentity?: AccountIdentity5;
    /** 交易類型 */
    action?: string;
    /** 小計 */
    after?: number;
    /** 注單號碼 */
    bankId?: string;
    /** 建立時間 */
    createTime?: string;
    /** 是否首儲 */
    firstDeposit?: boolean;
    /** ID */
    id?: string;
    /** 會員等級 */
    memberLevel?: number;
    /** 後台備註 */
    memo?: string;
    /** 暱稱 */
    nickname?: string;
    /** 是否未派彩 */
    noPrize?: boolean;
    /** 操作人員帳號 */
    operatorAccount?: string;
    /** 操作身份 */
    operatorIdentity?: OperatorIdentity4;
    /** 遊戲平台 */
    platform?: string;
    /** 點數 */
    point?: number;
    /** 匯率 */
    rate?: number;
    /** 類型 */
    recordAction?: string;
    /** 局號 */
    recordId?: string;
    /** 參考單號 */
    referenceId?: string;
    /** 狀態 */
    status?: string;
    /** 娛樂城 */
    supplier?: string;
    /** 系統備註 */
    systemMemo?: string;
    /** 用戶備註 */
    userMemo?: string;
    /** VIP層級 */
    vipGradeSettingId?: string;
};
export type Type = "DEPOSIT" | "FIRST_DEPOSIT";
export type UpdateAdminForceAuthRequestVO = {
    /** 帳號 */
    account: string;
    enabled?: boolean;
};
export type UpdateAdminInfoRequestVO = {
    /** 帳號 */
    account: string;
    /** 信箱 */
    mail?: string;
    /** 暱稱 */
    nickname: string;
};
export type UpdateAdminManualTransferRequestVO = {
    /** 帳號 */
    account: string;
    manualTransfer?: ManualTransfer;
};
export type UpdateAdminRoleRequestVO = {
    /** 帳號 */
    account: string;
    /** 角色 ID */
    roleList: string[];
};
export type UpdateAdminStatusRequestVO = {
    /** 帳號 */
    account: string;
    /** 狀態 */
    status: Status4;
};
export type UpdateDomainSettingRequestVO = {
    /** 域名 */
    siteList: SiteDetail[];
};
export type UpdateDomainSettingResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** Storage */
    list: BlobVo[];
    /** 是否成功 */
    success?: boolean;
};
export type UpdateMemberInfoRequestVO = {
    /** 生日 */
    birthday?: string;
    /** 國碼 */
    countryCode?: string;
    /** 名 */
    firstName?: string;
    /** 姓 */
    lastName?: string;
    /** 信箱 */
    mail?: string;
    /** 帳號 */
    memberAccount: string;
    /** 暱稱 */
    nickName: string;
    /** 手機 */
    phone?: string;
    /** 性別 */
    sex?: string;
};
export type UpdateMemberLevelSettingRequestVO = {
    /** 等級資料列表 */
    list: MemberLevelSettingRequestVo[];
};
export type UpdateMemberMemoRequestVO = {
    /** 帳號 */
    memberAccount: string;
    /** 備註 */
    memo: string;
};
export type UpdateMemberStatusRequestVO = {
    /** 帳號 */
    memberAccount: string;
    /** 狀態 */
    status: Status5;
};
export type UpdatePaymentRecordStatusRequestVO = {
    /** 動作 */
    action: Action2;
    /** ID */
    id: string;
};
export type UpdatePaymentRecordStatusResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    recordStatus?: RecordStatus;
    /** 是否成功 */
    success?: boolean;
};
export type UpdatePersonalForcePasswordRequestVO = {
    /** 新密碼 */
    newPassword: string;
};
export type UpdatePersonalInfoRequestVO = {
    /** 店鋪資訊 */
    locationList?: string[];
    /** 信箱 */
    mail: string;
    /** 暱稱 */
    nickname?: string;
};
export type UpdatePersonalPasswordRequestVO = {
    /** 新密碼 */
    newPassword: string;
    /** 舊密碼 */
    oldPassword: string;
};
export type UpdatePersonalPasswordResponseVO = {
    /** 錯誤代碼 */
    code?: number;
    /** 錯誤訊息 */
    errorMessage?: string;
    /** 是否成功 */
    success?: boolean;
    /** Token */
    token?: string;
};
export type UpgradeRewards = {
    balance?: number;
    exp?: number;
    honer?: number;
    integral?: number;
};
export type authorities = {
    BaseAuthority?: boolean;
    EditMemberDetailAuthority?: boolean;
};
export type betLimitSetting = {
    betLimitGroup?: string;
};
export type description = {
    cn?: string;
    en?: string;
};
export type deviceType = {
    COMPUTER?: string;
    DMR?: string;
    GAME_CONSOLE?: string;
    MOBILE?: string;
    TABLET?: string;
    UNKNOWN?: string;
    WEARABLE?: string;
};
export type json = {
    list?: string;
    map?: string;
    prop1?: string;
};
export type map = {
    key1?: string;
    key2?: string;
};
export type nameMap = {
    cn?: string;
    en?: string;
};
export type plarformGameTypeDetail = {
    /** 遊戲類型 */
    gameTypeList?: string[];
    /** 平台 */
    platform?: string;
};
export type roleList = {
    "6111ede1b9e44156132a2d8c"?: string;
    "66d188321b8e72442d44d0de"?: string;
};

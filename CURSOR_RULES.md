# RTK Query OpenAPI 代碼生成規則

## Headers 處理規則

### 全局處理
1. API 請求的 headers（如 `Authorization`、`Client-Id` 等）應該在 baseApi 中統一處理
2. 這些 headers 不應該在每個生成的 endpoint 中重複定義
3. 代碼生成器會自動忽略 OpenAPI 規範中的 header 參數

### 實現方式
1. 在 `generate.ts` 中過濾掉所有 header 類型的參數：
   ```typescript
   const parameters = supportDeepObjects([...pathItemParameters, ...operationParameters])
     .filter(argumentMatches(overrides?.parameterFilter))
     .filter(param => param.in !== 'header');
   ```

2. 在生成的 query 函數中移除 headers 屬性：
   ```typescript
   createObjectLiteralExpression([
     // url, method, body, cookies, params 等屬性
     // 不包含 headers
   ])
   ```

### 使用方式
1. 在 baseApi 中設置全局 headers：
   ```typescript
   import { createApi } from '@reduxjs/toolkit/query/react'

   export const baseApi = createApi({
     baseQuery: fetchBaseQuery({
       prepareHeaders: (headers, { getState }) => {
         // 在這裡添加全局 headers
         headers.set('Client-Id', 'YOUR_CLIENT_ID')
         const token = (getState() as RootState).auth.token
         if (token) {
           headers.set('Authorization', `Bearer ${token}`)
         }
         return headers
       },
     }),
     endpoints: () => ({}),
   })
   ```

## 參數處理規則

### Query 參數
- 保留在生成的代碼中
- 可以通過 `encodeQueryParams` 選項控制是否進行 URL 編碼

### Path 參數
- 保留在生成的代碼中
- 可以通過 `encodePathParams` 選項控制是否進行 URL 編碼

### Cookie 參數
- 保留在生成的代碼中
- 通過 `cookies` 屬性傳遞

### Body 參數
- 保留在生成的代碼中
- 直接作為 `body` 屬性傳遞

## 注意事項

1. 代碼生成後，所有的 header 參數都會被移除，不會出現在生成的類型定義中
2. 如果需要自定義某些 endpoint 的 headers，應該通過 RTK Query 的 `extraOptions` 或者在 baseQuery 中處理
3. 這種設計可以確保：
   - 更好的代碼復用性
   - 更容易的認證管理
   - 更清晰的類型定義
   - 減少重複代碼 
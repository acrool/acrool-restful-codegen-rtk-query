<p align="center">
  <img src="https://raw.githubusercontent.com/rtk-incubator/rtk-query/main/logo.png" width="400" />
</p>
<h2 align="center">
Code Generator
</h2>

<p align="center">
   <a href="https://discord.gg/0ZcbPKXt5bZ6au5t" target="_blank">
    <img src="https://img.shields.io/badge/chat-online-green" alt="Discord server" />
  </a>
</p>

### Introduction

This is a utility library meant to be used with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) that will generate a typed API client from an OpenAPI schema.

### Features

- **Local Schema File Support**: Direct processing of local schema files via `schemaFile`
- **Remote Schema Download**: Download remote schemas to local files via `remoteFile` and `schemaFile`
- **Type Generation**: Generates TypeScript types from OpenAPI schemas
- **RTK Query Integration**: Seamless integration with RTK Query

### Configuration Options

- `schemaFile`: The local OpenAPI schema file path (required)
- `remoteFile`: (Optional) Remote schema URL to download to `schemaFile` path
- `outputFile`: The output file path for generated code
- `apiFile`: The base API file path

### Example Configuration

```typescript
// For remote schemas with download
{
  schemaFile: './schemas/api-schema.json',
  remoteFile: 'https://api.example.com/openapi.json',
  apiFile: './baseApi',
  outputFile: './generated-api.ts'
}

// For local schema files
{
  schemaFile: './schemas/api-schema.json',
  apiFile: './baseApi',
  outputFile: './generated-api.ts'
}
```

### Documentation

[View the RTK Query Code Generation docs](https://redux-toolkit.js.org/rtk-query/usage/code-generation)

### Test

```bash
yarn build && npx acrool-rtk-query-codegen-openapi ./rtk-query-codegen.config.ts
yarn build && npx acrool-rtk-query-codegen-openapi ./rtk-query-codegen-slice.config.ts
rm -rf test_output3/* && node lib/bin/cli.mjs rtk-query-codegen-slice.config.ts
```

new

```bash
yarn cli ./react-rtk-query.config.ts
```



## Step

1. [endpoint-generator] EndpointGenerator.generateEndpoints....
2. [endpoint-generator] EndpointGenerator.generateForGroup.......
  2.1. [generate-new] generateApi........ 
2. [endpoint-generator] EndpointGenerator.generateForGroup.......
  2.1. [generate-new] generateApi........ 

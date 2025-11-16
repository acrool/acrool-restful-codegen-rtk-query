# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a TypeScript-based code generation tool that creates typed API clients from OpenAPI schemas for RTK Query. The tool generates service classes, query hooks, and TypeScript types from OpenAPI/Swagger specifications.

## Common Commands

### Development
- `yarn build` - Build the project (cleans, compiles with tsup, and sets executable permissions)
- `yarn clean` - Remove the lib directory
- `yarn format` - Format code with Prettier
- `yarn test` - Run tests with Vitest (includes typecheck)
- `yarn test:watch` - Run tests in watch mode
- `yarn test:update` - Update test snapshots

### Code Generation Testing
- `yarn cli ./rtk-query-codegen-slice.config.ts` - Run the CLI in development mode
- `yarn build && npx acrool-ng-query-codegen-openapi ./rtk-query-codegen-slice.config.ts` - Build and run production CLI

### Release
- `yarn release:patch/minor/major` - Create a new release with standard-version

## Architecture

### Core Services (src/services/)
- **UnifiedCodeGenerator** - Main orchestrator that coordinates the entire generation process
- **OpenApiService** - Handles OpenAPI schema parsing and operation extraction
- **GroupService** - Manages grouping of endpoints by path patterns
- **FileWriterService** - Handles file system operations and output management
- **ApiCodeGenerator** - Generates service classes and API methods
- **QueryCodeGenerator** - Generates RTK Query hooks and cache management

### Generators (src/generators/)
Each generator creates specific file types:
- **api-service-generator** - Service class files with HTTP methods
- **query-service-generator** - RTK Query hooks and mutations
- **types-generator** - TypeScript type definitions
- **cache-keys-generator** - Cache key constants for invalidation
- **common-types-generator** - Shared types across services
- **utils-generator** - Helper utilities

### Configuration
The tool uses configuration files (typically `*.config.ts`) with these key properties:

**Required:**
- `schemaFile` - Local OpenAPI schema file path
- `outputFiles.outputDir` - Output directory for generated files
- `outputFiles.groupKeyMatch` - Function to determine service grouping
- `outputFiles.queryMatch` - Function to identify query vs mutation operations

**Optional:**
- `remoteFile` - Remote schema URL to download (overrides local schemaFile)
- `outputFiles.filterEndpoint` - Filter function for endpoints (defaults to allowing all)
- `apiConfiguration` - Custom API configuration import settings
- `httpClient` - Custom HTTP client configuration (supports `importReturnTypeName` for type aliases)
- `useLazyQueries` - When `true`, generates additional lazy query hooks (useLazy prefix) for query endpoints

### Key Design Principles

1. **Header Filtering**: The generator automatically filters out header parameters from OpenAPI specs, expecting headers to be handled globally in the base API configuration.

2. **Service Grouping**: Endpoints are grouped into service classes based on URL path patterns defined by `groupKeyMatch`.

3. **Query vs Mutation Detection**: Uses `queryMatch` function to determine whether an endpoint should be a query (data fetching) or mutation (data modification).

4. **Type Safety**: Generates comprehensive TypeScript types for all request/response objects, parameters, and return types.

5. **Cache Management**: Creates cache key constants for RTK Query invalidation and provides utilities for cache management.

## Testing

- Tests use Vitest with TypeScript support
- Snapshot testing for generated code consistency
- Test fixtures in `test/fixtures/` contain sample OpenAPI schemas
- Mock server setup with MSW for integration tests

## File Structure

```
src/
├── bin/           # CLI entry point
├── services/      # Core business logic
├── generators/    # Code generation modules
├── utils/         # Shared utilities
└── types.ts       # Type definitions

test/
├── fixtures/      # Test OpenAPI schemas
├── __snapshots__/ # Jest/Vitest snapshots
└── *.test.ts      # Test files
```

## Important Notes

- This tool is specifically designed for React RTK Query code generation
- The tool only supports multiple file output via `outputFiles` configuration
- Generated code uses custom HTTP client configurations rather than fetch/axios directly
- All generated files include ESLint disable comments and "DO NOT MODIFY" headers
- The build process must complete successfully before testing CLI changes with `yarn cli`
- Import statements are dynamically generated based on `apiConfiguration` and `httpClient` settings
- When `useLazyQueries: true`, both regular and lazy query hooks are generated for query endpoints
- `enhanceEndpoints.ts` files are protected from overwriting to allow custom cache tag configuration
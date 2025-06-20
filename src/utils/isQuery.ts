import type { EndpointOverrides, operationKeys } from '../types';

export function isQuery(
  verb: (typeof operationKeys)[number],
  path: string,
  overrides: EndpointOverrides | undefined,
  queryMatch?: (method: string, path: string) => boolean
) {
  if (queryMatch) {
    return queryMatch(verb, path);
  }
  if (overrides?.type) {
    return overrides.type === 'query';
  }
  return verb === 'get';
}

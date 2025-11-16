/* eslint-disable */
// [Warning] Generated automatically - do not edit manually 
    
/**
* Clear undefined in object
*/
export function withoutUndefined(obj?: Record<string, any>) {
  if(typeof obj === 'undefined') return;
  return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}


export interface MutationOriginInput {
  requestUrl: string;
  origin: string;
  fetchSite: string;
  hasProxyIdentity: boolean;
}

export function mutationOriginAllowed(input: MutationOriginInput): boolean {
  if (input.fetchSite && !["same-origin", "none"].includes(input.fetchSite)) return false;
  if (input.fetchSite === "same-origin") return true;
  if (!input.origin) return true;
  try {
    const origin = new URL(input.origin);
    if (origin.origin === new URL(input.requestUrl).origin) return true;
    return input.hasProxyIdentity && origin.protocol === "https:";
  } catch {
    return false;
  }
}

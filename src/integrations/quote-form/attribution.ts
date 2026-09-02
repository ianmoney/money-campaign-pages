export const ATTRIBUTION_PARAMETER_ALLOWLIST = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "msclkid",
] as const;

const MAX_ATTRIBUTION_VALUE_LENGTH = 256;

export function appendAllowlistedAttribution(
  embedUrl: URL,
  pageSearch: string,
): URL {
  const source = new URLSearchParams(pageSearch);

  for (const name of ATTRIBUTION_PARAMETER_ALLOWLIST) {
    const value = source.get(name);
    if (!value) continue;

    const safeValue = value.trim().slice(0, MAX_ATTRIBUTION_VALUE_LENGTH);
    if (safeValue) embedUrl.searchParams.set(name, safeValue);
  }

  return embedUrl;
}

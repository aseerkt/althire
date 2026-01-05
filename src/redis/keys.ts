export const REDIS_CACHE_KEYS = {
  ORG_MEMBER_ROLE: (orgId: string, userId: string) =>
    `org:role:${orgId}:${userId}`,
  ORG_BY_ID: (orgType: string, orgId: string) => `org:${orgType}:${orgId}`,
  ORG_ID_FROM_SLUG: (orgType: string, orgSlug: string) =>
    `org:slug:${orgType}:${orgSlug}`,
}

export const REDIS_CACHE_KEYS = {
  SESSION: (sessionId: string) => `session:${sessionId}`,

  ORG_MEMBER_ROLE: (orgId: string, userId: string) =>
    `org:role:${orgId}:${userId}`,
  ORG_BY_ID: (orgId: string) => `org:${orgId}`,
  ORG_ID_FROM_SLUG: (orgSlug: string) => `org:slug:${orgSlug}`,
}

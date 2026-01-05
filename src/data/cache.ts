export const CACHE_KEY = {
  CURRENT_USER: () => 'CURRENT_USER',

  GET_USER_BY_USERNAME: (username: string) =>
    `GET_USER_BY_USERNAME:${username}`,

  GET_JOB_BY_ID: (jobId: string) => `GET_JOB_BY_ID:${jobId}`,

  GET_JOB_APPLICANTS_COUNT: (jobId: string) =>
    `GET_JOB_APPLICANTS_COUNT:${jobId}`,

  GET_COMPANY_BY_URI: (uri: string) => `GET_COMPANY_BY_ID:${uri}`,

  GET_COMPANY_JOB_COUNT: (companyId: string) =>
    `GET_COMPANY_JOB_COUNT:${companyId}`,

  GET_ORGANIZATION_MEMBER_COUNT: (organizationId: string) =>
    `GET_ORGANIZATION_MEMBER_COUNT:${organizationId}`,

  GET_USER_JOB_APPLICATION: (userId: string, jobId: string) =>
    `GET_CURRENT_USER_APPLICATION:${userId}:${jobId}`,
}

export interface AuthOptions {
  redirectPath: string;
  clientId: string;
  issuer: string;
  api: string;
  postLogoutRedirectPath?: string;
  logoutPath?: string;
  scopes?: string[];
  showDebugInformation?: boolean;
  tokenRefresh?: number;
  authEnabled: boolean;
}

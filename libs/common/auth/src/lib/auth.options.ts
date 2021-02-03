export interface AuthOptions {
  redirectPath: string;
  clientId: string;
  issuer: string;
  postLogoutRedirectPath?: string;
  logoutPath?: string;
  scopes?: string[];
  showDebugInformation?: boolean;
  tokenRefresh?: number;
  authEnabled: boolean;
}

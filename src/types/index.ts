// ============================================
// ADMIN DASHBOARD TYPES
// ============================================

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface AdminVideoListResponse {
  success: boolean;
  data: Video[];
}

export interface AdminVideoDetailResponse {
  success: boolean;
  data: Video | null;
}

export interface AdminVideoCreateResponse {
  success: boolean;
  message: string;
  data?: Video;
}

export interface AdminVideoUpdateResponse {
  success: boolean;
  message: string;
  data?: Video;
}

export interface AdminVideoDeleteResponse {
  success: boolean;
  message: string;
}

export interface AdminSettingsResponse {
  success: boolean;
  data: SiteSettings;
}
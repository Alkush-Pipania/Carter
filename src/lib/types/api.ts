// Define core data types
export interface Link {
  secret_Id: string;
  title: string;
  description: string;
  links: string;
  imgurl?: string;
  createdAt: string | Date;
}

// API response types
export interface ApiErrorResponse {
  error: true;
  message: string;
  details?: string;
}

export interface ApiSuccessResponse<T> {
  error: false;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Specific API response types
export type SecretKeyResponse = ApiResponse<Link[]>; 
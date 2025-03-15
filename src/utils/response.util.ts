export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
  }
  
  export function createResponse<T>(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T
  ): ApiResponse<T> {
    return {
      success,
      statusCode,
      message,
      data,
    };
  }
  
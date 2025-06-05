import { apiClient } from './client';

export interface Invite {
  id: string;
  email: string;
  role: string;
  token: string;
  schoolId: string;
  accepted: boolean;
  createdAt: string;
  school?: {
    id: string;
    name: string;
  };
}

export class InviteApiService {
  private static readonly BASE_PATH = '/invites';

  /**
   * Validate an invite token
   */
  static async validateInvite(token: string): Promise<Invite> {
    try {
      return await apiClient.get<Invite>(`${this.BASE_PATH}/validate/${token}`);
    } catch (error) {
      console.error('Validate invite error:', error);
      throw error;
    }
  }

  /**
   * Accept an invite
   */
  static async acceptInvite(token: string): Promise<{ message: string }> {
    try {
      return await apiClient.post<{ message: string }>(`${this.BASE_PATH}/accept/${token}`);
    } catch (error) {
      console.error('Accept invite error:', error);
      throw error;
    }
  }
}

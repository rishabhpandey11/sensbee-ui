import api from '../axios';
import { UserRegistration } from '../types/auth.types';

interface UserInfo {
email: string;
id: string;
name: string;
roles: Array<{
  id: number;
  name: string;
  system: boolean;
}>;
verified: boolean;
}

export const userService = {
async listUsers(): Promise<UserInfo[]> {
  const response = await api.get<UserInfo[]>('/api/users/list');
  return response.data;
},

async verifyUsers(id: string): Promise<UserInfo[]> {
    const response = await api.post<UserInfo[]>(`/api/users/${id}/verify`);
    return response.data;
  },

async registerUser(userData: UserRegistration): Promise<string> {

  const response = await api.post<string>('/api/users/register', userData);
  return response.data;

},

async getUserInfo(userId: string): Promise<UserInfo> {
  const response = await api.get<UserInfo>(`/api/users/${userId}/info`);
  return response.data;
},

async assignRole(userId: string, roleName: string): Promise<void> {
  await api.post(`/api/users/${userId}/role`, JSON.stringify(roleName));
},
async deleteUser(userId: string): Promise<void> {
  await api.delete(`/api/users/${userId}/delete`);
},

async revokeRole(userId: string, roleName: string): Promise<void> {
  await api.delete(`/api/users/${userId}/role`, {
    data: JSON.stringify(roleName)
  });
}


};

export default userService;
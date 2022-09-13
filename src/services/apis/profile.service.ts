import { BaseApi } from './abstract';

import { Profile } from '../../models/profile';

class ProfileService extends BaseApi {

  async getById(id: string): Promise<Profile> {
    return this.get(`company/${id}`);
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    return this.put(`company/${id}`, data);
  }
}

export default new ProfileService();
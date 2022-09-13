import { BaseApi } from './abstract';

import { Profile } from '../../models/profile';

class ProfileService extends BaseApi {

  async getById(id: string): Promise<Profile> {
    return this.get(`profile/${id}`);
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    const formData = this.convertToFormData(data);

    const headers = this.getHeaders;
    headers['Content-Type'] = 'multipart/form-data';

    return this.put(`profile/${id}`, formData, {headers});
  }

  private convertToFormData(data: any) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }
}

export default new ProfileService();
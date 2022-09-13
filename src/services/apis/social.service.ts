import { BaseApi } from './abstract';

import { Social } from '../../models/social';

class SocialService extends BaseApi {

  async getAll(active = true): Promise<Social[]> {
    const params: {active?: boolean} = {};
    if (typeof active === 'boolean') params.active = active;
    return this.get('social', params);
  }

  async getById(id: string): Promise<Social> {
    return this.get(`social/${id}`);
  }

  async add(data: Social): Promise<Social> {
    return this.post('social', data);
  }

  async update(id: string, data: Partial<Social>): Promise<Social> {
    return this.put(`social/${id}`, data);
  }

  async save(data: Social) {
    if (data.id) return this.update(data.id, data);
    else return this.add(data);
  }

  async active(id: string): Promise<void> {
    return this.patch(`social/${id}/active`);
  }

  async delete(id: string): Promise<void> {
    return this.delete(`social/${id}`);
  }
}

export default new SocialService();
import { BaseApi } from './abstract';

import { Skill } from '../../models/skill';

class SkillService extends BaseApi {

  async getAll(active = true): Promise<Skill[]> {
    const params: {active?: boolean} = {};
    if (typeof active === 'boolean') params.active = active;
    return this.get('skill', params);
  }

  async getById(id: string): Promise<Skill> {
    return this.get(`skill/${id}`);
  }

  async add(data: Skill): Promise<Skill> {
    return this.post('skill', data);
  }

  async update(id: string, data: Partial<Skill>): Promise<Skill> {
    return this.put(`skill/${id}`, data);
  }

  async save(data: Skill) {
    if (data.id) return this.update(data.id, data);
    else return this.add(data);
  }

  async active(id: string): Promise<void> {
    return this.patch(`skill/${id}/active`);
  }

  async delete(id: string): Promise<void> {
    return this.delete(`skill/${id}`);
  }
}

export default new SkillService();
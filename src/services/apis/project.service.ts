import { BaseApi } from './abstract';

import { Project } from '../../models/project';

class ProjectService extends BaseApi {

  async getAll(active = true): Promise<Project[]> {
    const params: {active?: boolean} = {};
    if (typeof active === 'boolean') params.active = active;
    return this.get('project', params);
  }

  async getById(id: string): Promise<Project> {
    return this.get(`project/${id}`);
  }

  async add(data: Project): Promise<Project> {
    return this.post('project', data);
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return this.put(`project/${id}`, data);
  }

  async save(data: Project) {
    if (data.id) return this.update(data.id, data);
    else return this.add(data);
  }

  async active(id: string): Promise<void> {
    return this.patch(`project/${id}/active`);
  }

  async delete(id: string): Promise<void> {
    return this.delete(`project/${id}`);
  }
}

export default new ProjectService();
import { BaseApi } from './abstract';

import { Service } from '../../models/service';

class ServiceService extends BaseApi {

  async getAll(active = true): Promise<Service[]> {
    const params: {active?: boolean} = {};
    if (typeof active === 'boolean') params.active = active;
    return this.get('service', params);
  }

  async getById(id: string): Promise<Service> {
    return this.get(`service/${id}`);
  }

  async add(data: Service): Promise<Service> {
    return this.post('service', data);
  }

  async update(id: string, data: Partial<Service>): Promise<Service> {
    return this.put(`service/${id}`, data);
  }

  async save(data: Service) {
    if (data.id) return this.update(data.id, data);
    else return this.add(data);
  }

  async active(id: string): Promise<void> {
    return this.patch(`service/${id}/active`);
  }

  async delete(id: string): Promise<void> {
    return this.delete(`service/${id}`);
  }
}

export default new ServiceService();
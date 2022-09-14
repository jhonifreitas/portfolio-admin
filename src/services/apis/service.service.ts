import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';

import { BaseApi } from './abstract';

import { Service } from '../../models/service';

import { fbStorage } from "../../firebase.config";

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

  // UPLOAD
  private ref(id: string) {
    return ref(fbStorage, `/services/${id}/icon.png`);
  }

  async uploadIcon(id: string, file: Blob | File): Promise<string> {
    const storage = this.ref(id);

    return uploadBytes(storage, file).then(async _ => {
      const url = await getDownloadURL(storage);
      await this.update(id, {icon: url});
      return url;
    });
  }

  async deleteIcon(id: string) {
    const storage = this.ref(id);

    return deleteObject(storage).then(_ => {
      return this.update(id, {icon: null});
    });
  }
}

export default new ServiceService();
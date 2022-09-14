import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';

import { BaseApi } from './abstract';

import { Company } from '../../models/company';

import { fbStorage } from "../../firebase.config";

class CompanyService extends BaseApi {

  async getAll(active = true): Promise<Company[]> {
    const params: {active?: boolean} = {};
    if (typeof active === 'boolean') params.active = active;
    return this.get('company', params);
  }

  async getById(id: string): Promise<Company> {
    return this.get(`company/${id}`);
  }

  async add(data: Company): Promise<Company> {
    return this.post('company', data);
  }

  async update(id: string, data: Partial<Company>): Promise<Company> {
    return this.put(`company/${id}`, data);
  }

  async save(data: Company) {
    if (data.id) return this.update(data.id, data);
    else return this.add(data);
  }

  async active(id: string): Promise<void> {
    return this.patch(`company/${id}/active`);
  }

  async delete(id: string): Promise<void> {
    return this.delete(`company/${id}`);
  }

  // UPLOAD
  private ref(id: string) {
    return ref(fbStorage, `/companies/${id}/logo.png`);
  }

  async uploadLogo(id: string, file: Blob | File): Promise<string> {
    const storage = this.ref(id);

    return uploadBytes(storage, file).then(async _ => {
      const url = await getDownloadURL(storage);
      await this.update(id, {logo: url});
      return url;
    });
  }

  async deleteLogo(id: string) {
    const storage = this.ref(id);

    return deleteObject(storage).then(_ => {
      return this.update(id, {logo: null});
    });
  }
}

export default new CompanyService();
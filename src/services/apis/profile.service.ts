import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';

import { BaseApi } from './abstract';

import { Profile } from '../../models/profile';

import { fbStorage } from "../../firebase.config";

class ProfileService extends BaseApi {

  async getById(id: string): Promise<Profile> {
    return this.get(`profile/${id}`);
  }

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    return this.put(`profile/${id}`, data);
  }

  // UPLOAD
  async uploadFile(id: string, file: Blob | File, fileName: string): Promise<string> {
    const storage = ref(fbStorage, `/profiles/${id}/${fileName}`);

    return uploadBytes(storage, file).then(async _ => {
      const url = await getDownloadURL(storage);
      return url;
    });
  }

  deleteFile(url: string) {
    const storage = ref(fbStorage, url);
    return deleteObject(storage);
  }
}

export default new ProfileService();
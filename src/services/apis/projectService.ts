import axios from 'axios';

import { Project } from '../../interfaces/project';

class ProjectService {

  private url = `${process.env.HOST_API}`;

  getAll(): Promise<Project[]> {
    return axios.get(`${this.url}/project`);
  }
}

export default new ProjectService();
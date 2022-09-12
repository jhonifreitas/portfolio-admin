import { BaseModel } from './base';

export class Company extends BaseModel {
  name!: string;
  link?: string;
  logo?: string;
}

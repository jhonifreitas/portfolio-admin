import { BaseModel } from './base';

export class Company extends BaseModel {
  name!: string;
  init!: Date;
  description!: string;

  end?: Date;
  link?: string;
  logo?: string;
}

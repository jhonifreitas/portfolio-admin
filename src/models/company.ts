import { BaseModel } from './base';

export class Company extends BaseModel {
  name!: string;
  init!: Date | string;
  description_PT!: string;
  description_EN!: string;

  end?: Date | string;
  link?: string;
  logo?: string | null;
}

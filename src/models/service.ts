import { BaseModel } from './base';

export class Service extends BaseModel {
  title_PT!: string;
  title_EN!: string;

  icon?: string | null;

  description_PT!: string;
  description_EN!: string;
}

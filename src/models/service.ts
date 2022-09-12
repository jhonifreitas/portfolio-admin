import { BaseModel } from './base';

export class Service extends BaseModel {
  title_PT!: string;
  title_EN!: string;

  icon!: string;

  description_PT!: string;
  description_EN!: string;
}

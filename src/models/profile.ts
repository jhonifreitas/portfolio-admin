import { BaseModel } from './base';

export class Profile extends BaseModel {
  name!: string;
  photo?: string | null;
  profession_init!: Date | string;

  profession_PT!: string;
  profession_EN!: string;

  about_PT!: string;
  about_EN!: string;

  CV_PT?: string | null;
  CV_EN?: string | null;
}

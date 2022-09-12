import { BaseModel } from "./base";

export class Project extends BaseModel {
  companyId!: string;
  skillIds: string[];

  name!: string;
  type!: ProjectType;
  link?: string;

  description_PT!: string;
  description_EN!: string;

  images: string[];
  featured_image: number;

  constructor() {
    super();
    this.images = [];
    this.skillIds = [];
    this.featured_image = 0;
  }
}

export type ProjectType = 'mobile' | 'system' | 'website' | 'e-commerce';

import { BaseModel } from './base';

export class Skill extends BaseModel {
  name!: string;
  years: number;
  percent: number;

  constructor() {
    super();
    this.years = 0;
    this.percent = 0;
  }
}

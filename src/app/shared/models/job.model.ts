import { Abilitie } from './abilitie.model';
import { Language } from './language.model';

import { Occupation } from './occupation.model';

export interface Job {
  occupation: Occupation;
  salary: number;
  description: string;
  recruiterID: string;
  companyID: string;
  city?: string;
  abilities?: Array<Abilitie>;
  languages?: Array<Language>;
}

import { Abilitie } from './abilitie';
import { Occupation } from './occupation.enum';
import { LanguageWithLevel } from './language-with-level';

export interface Job {
  occupation: Occupation;
  salary: number;
  description: string;
  recruiterID: string;
  employerID: string;
  city?: string;
  abilities?: Array<Abilitie>;
  languages?: Array<LanguageWithLevel>;
}

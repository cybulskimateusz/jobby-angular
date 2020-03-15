import { Abilitie } from './abilitie';
import { Contact } from './contact';
import { Experience } from './experience';
import { Project } from './project';
import { LanguageWithLevel } from './language-with-level';

export interface Employee {
  name: string;
  surname: string;
  position: string;
  profilePicture: string;
  born: Date;
  abilities: Array<Abilitie>;
  experience?: Array<Experience>;
  languages: Array<LanguageWithLevel>;
  city?: string;
  contacts: Array<Contact>;
  projects?: Array<Project>;
  employeeID: string;
}

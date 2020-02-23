import { Abilitie } from './abilitie.model';
import { Language } from './language.model';
import { Contact } from './contact.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

export interface Employee {
  name: string;
  surname: string;
  position: string;
  profilePicture: string;
  born: Date;
  abilities: Array<Abilitie>;
  experience?: Array<Experience>;
  languages: Array<Language>;
  city?: string;
  contacts: Array<Contact>;
  projects?: Array<Project>;
  employeeID: string;
}

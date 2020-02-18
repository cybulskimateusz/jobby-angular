import { Abilitie } from './abilitie';
import { Language } from './language';
import { Contact } from './contact';
import { Experience } from './experience';
import { Project } from './project';

export interface Employee {
  name: string;
  surname: string;
  position: string;
  profilePicture: string;
  born: Date;
  abilities: Array<Abilitie>;
  experience?: Array<Experience>;
  languages: Array<Language>;
  contacts: Array<Contact>;
  projects?: Array<Project>;
}

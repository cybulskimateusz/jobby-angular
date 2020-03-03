import { Contact } from './contact.model';
import { Project } from './project.model';

export interface Employer {
  company: string;
  contacts: Array<Contact>;
  projects?: Array<Project>;
}

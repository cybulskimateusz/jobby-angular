import { Contact } from './contact';
import { Project } from './project';

export interface Employer {
  company: string;
  contacts: Array<Contact>;
  projects?: Array<Project>;
}

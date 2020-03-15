import { Contact } from './contact';
import { Project } from './project';

export interface Employer {
  name: string;
  contacts: Array<Contact>;
  projects?: Array<Project>;
}

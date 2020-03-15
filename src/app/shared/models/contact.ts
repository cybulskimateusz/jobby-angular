export interface Contact {
  contactWay: ContactWay;
  link: string;
}

export enum ContactWay {
  facebook = 'facebook',
  twitter = 'twitter',
  messenger = 'messenger',
  linkedin = 'linkedin',
  github = 'github',
  bitbucket = 'bitbucket',
  phone = 'phone',
  mail = 'mail',
  website = 'website'
}

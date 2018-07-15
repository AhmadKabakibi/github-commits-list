import { Person } from './commit-author.model';

export interface Commit {
  author: Person;
  committer: Person;
  message: string;
}

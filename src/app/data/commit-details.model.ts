import { Commit } from './commit.model';
import { Profile } from './profile.model';

export interface CommitDetails {
  sha: string;
  commit: Commit;
  author: Profile;
  committer: Profile;
}

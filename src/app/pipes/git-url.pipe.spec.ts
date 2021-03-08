import { GitUrlPipe } from './git-url.pipe';

describe('GitUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new GitUrlPipe();
    expect(pipe).toBeTruthy();
  });
});

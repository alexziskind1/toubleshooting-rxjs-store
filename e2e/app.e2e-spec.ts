import { RxtextPage } from './app.po';

describe('rxtext App', () => {
  let page: RxtextPage;

  beforeEach(() => {
    page = new RxtextPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

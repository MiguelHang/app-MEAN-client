import { AppMEANClientPage } from './app.po';

describe('app-mean-client App', () => {
  let page: AppMEANClientPage;

  beforeEach(() => {
    page = new AppMEANClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

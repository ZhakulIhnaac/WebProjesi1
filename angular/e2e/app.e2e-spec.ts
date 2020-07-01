import { AYCCorporateTemplatePage } from './app.po';

describe('AYCCorporate App', function() {
  let page: AYCCorporateTemplatePage;

  beforeEach(() => {
    page = new AYCCorporateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

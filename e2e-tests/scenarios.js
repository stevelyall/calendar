'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /month_view when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/month_view");
  });


  describe('month_view', function() {

    beforeEach(function() {
      browser.get('index.html#/month_view');
    });


    it('should render month view when user navigates to /month_view', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Month View/);
    });

  });
  
});

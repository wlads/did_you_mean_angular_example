describe("Search",function(){
  it("searches",function(){
    browser().navigateTo('/base/index.html');
    input('searchTerm').enter('Test');
    element('form :submit').click();
    expect(element('.products li').count()).toEqual(1);
    expect(element('.did-you-mean').text()).toContain("Did you mean? You Only Live Once");
  });
});

describe('My First Test', () => {
  beforeEach(function () {
    cy
      .server()
      .route({
        method: "GET",
        url: "https://api.github.com/repos/angular/material2/commits?page=1",
        status: 200,
        response: "fixture:example.json"
      })
      .as("getCommits")
      .visit('overview');
  });

  it('Application has the correct h1 tag! and showing list of commits', () => {
    cy
      .wait("@getCommits")
      .get(".title")
      .should("contain", 'github repo commits overview')
      .get('tbody>tr:nth-child(1)>td')
      .should("contain", '3255cf3c3675037725ea579fcdfa373d06977fb4')
      .get('tbody>tr:nth-child(1)>td:nth-child(1)')
      .click();
  });
  
});

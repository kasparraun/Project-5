describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Assignment 3 test 1 - Delete issue', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('button[class="sc-bwzfXH dIxFno sc-kGXeez bLOzZQ"]').click();
    //Assert, that deletion confirmation dialogue is not visible.
    cy.contains('Are you sure you want to delete this issue?').should('not.exist');
    //Assert, that issue is deleted and not displayed on the Jira board anymore.
    cy.reload();
    cy.get('[data-testid="board-list:backlog').within(() => {
      cy.get('[data-testid="list-issue"]')
        .should('not.have.text', 'This is an issue of type: Task.')
    });
  });

  it('Assignment 3 test 2 - Cancel deleting of issue', () => {
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('button[class="sc-bwzfXH ewzfNn sc-kGXeez bLOzZQ"]').click();
    //Assert, that deletion confirmation dialogue is not visible.
    cy.contains('Are you sure you want to delete this issue?').should('not.exist');
    //Assert, that issue is not deleted and still displayed on the Jira board.
    cy.reload();
    cy.get('[data-testid="board-list:backlog').within(() => {
      cy.get('[data-testid="list-issue"]').eq(0)
        .should('have.text', 'This is an issue of type: Task.')
    });
  });
});

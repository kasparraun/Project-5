describe('ASSIGNMENT 2:AUTOMATION TESTS FOR TIME TRACKING FUNCTIONALITY', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
        });

        cy.get('[data-testid="icon:plus"]').click();
        cy.get('[data-testid="modal:issue-create"]').should('be.visible').within(() => {
            cy.get('[data-testid="select:type"]').click();
            cy.get('[data-testid="select-option:Story"]').trigger('click');
            cy.get('.ql-editor').type('Testing time tracking');
            cy.get('input[name="title"]').type('TestIssue');
            cy.get('[data-testid="select:userIds"]').click();
            cy.get('[data-testid="select-option:Lord Gaben"]').click();
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible')
            .and('contain', 'TestIssue');
    });

    it('Add, edit adn remove estimated time', () => {
        //Adding time estimation.
        cy.contains('TestIssue').click();
        cy.contains('No time logged').should('be.visible');
        cy.contains('Original Estimate (hours)').should('not.have.value');
        cy.get('input[placeholder="Number"]').type('10');
        cy.contains('10h estimated').should('be.visible');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.get('[data-testid="board-list:backlog').should('be.visible')
            .and('contain', 'TestIssue');
        cy.contains('TestIssue').click();
        cy.get('input[placeholder="Number"]').should('have.value', '10').and('be.visible');
        cy.get('input[placeholder="Number"]').clear().type('20');
        cy.contains('20h estimated').should('be.visible');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.get('[data-testid="board-list:backlog').should('be.visible')
            .and('contain', 'TestIssue');
        cy.contains('TestIssue').click();
        cy.get('input[placeholder="Number"]').should('have.value', '20').and('be.visible');
        cy.get('input[placeholder="Number"]').clear();
        cy.contains('Original Estimate (hours)').should('not.have.value');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.get('[data-testid="board-list:backlog').should('be.visible')
            .and('contain', 'TestIssue');
        cy.contains('TestIssue').click();
        cy.contains('No time logged').should('be.visible');
        cy.contains('Original Estimate (hours)').should('not.have.value');
    });

    it('Testing time logging and the rmoval of logged time', () => {
        cy.contains('TestIssue').click();
        cy.contains('No time logged').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible')
            .should('contain', 'Time spent (hours)')
            .and('contain', 'Time remaining (hours)');
        cy.get('input[placeholder="Number"]').eq(1).clear().type('8');
        cy.get('input[placeholder="Number"]').eq(2).clear().type('35');
        cy.contains('button', 'Done').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.contains('8h logged').should('be.visible');
        cy.contains('35h remaining').should('be.visible');
        cy.contains('No time logged').should('not.exist');

        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible')
        cy.get('input[placeholder="Number"]').eq(1).clear();
        cy.get('input[placeholder="Number"]').eq(2).clear();
        cy.contains('button', 'Done').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.contains('No time logged').should('be.visible');
        cy.contains('8h logged').should('not.exist');
        cy.contains('5h remaining').should('not.exist');
    });
});
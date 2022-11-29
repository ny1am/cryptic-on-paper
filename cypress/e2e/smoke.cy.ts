/// <reference types="cypress" />

describe('smoke test', () => {
  it('there is add cipher button', () => {
    cy.visit('/');
    cy.get('main button').should('have.length', 1);
    cy.get('main button').first().should('have.text', 'Add cipher');
  });
});

/// <reference types="cypress" />

Cypress.Commands.add('dataTest', (value: string) => cy.get(`[data-test=${value}]`));

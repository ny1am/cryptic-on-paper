/// <reference types="cypress" />

const addReverseCipherAndType = (plaintext: string) => {
  cy.dataTest('btn-show-ciphers').click();
  cy.dataTest('btn-attempt-add-cipher-Reverse').click();
  cy.dataTest('input-plaintext').type(plaintext);
};

describe('clear after copy', () => {
  beforeEach(() => {
    // clipboard-copy prefers the async API, stub it so the run needs no permissions
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.stub(win.navigator.clipboard, 'writeText').resolves();
      },
    });
  });

  it('is off by default and leaves the message and ciphers alone', () => {
    addReverseCipherAndType('test');

    cy.dataTest('btn-copy').click();

    cy.dataTest('input-plaintext').should('have.value', 'test');
    cy.dataTest('text-ciphertext').should('exist');
  });

  it('wipes the message and the ciphers once enabled, and undo brings them back', () => {
    addReverseCipherAndType('test');

    cy.dataTest('btn-copy-options').click();
    cy.dataTest('checkbox-clear-after-copy').check();
    cy.dataTest('btn-copy-options').click(); // dismiss the popover

    cy.dataTest('btn-copy').click();

    cy.dataTest('input-plaintext').should('have.value', '');
    cy.dataTest('text-ciphertext').should('not.exist');

    cy.contains('button', 'Undo').click();

    cy.dataTest('input-plaintext').should('have.value', 'test');
    cy.dataTest('text-ciphertext').should('exist');
  });

  it('remembers the preference across a reload', () => {
    addReverseCipherAndType('test');

    cy.dataTest('btn-copy-options').click();
    cy.dataTest('checkbox-clear-after-copy').check();

    cy.reload();

    addReverseCipherAndType('test');
    cy.dataTest('btn-copy-options').click();
    cy.dataTest('checkbox-clear-after-copy').should('be.checked');
  });
});

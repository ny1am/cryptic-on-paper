/// <reference types="cypress" />

import { reverseCipherFactory } from '@/features/cipher';

describe('simplest main flow', () => {
  it('add reverse cipher and test output', () => {
    //arrange
    const plaintext = 'test';
    cy.visit('/');
    //act
    cy.dataTest('btn-show-ciphers').click();
    cy.dataTest('btn-attempt-add-cipher-Reverse').click();
    cy.dataTest('input-plaintext').type(plaintext);
    const ciphertext = reverseCipherFactory()(plaintext);
    //assert
    cy.dataTest('text-ciphertext').should('have.text', ciphertext);
  });
});

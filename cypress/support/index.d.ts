declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-test attribute.
     * @example cy.dataTest('greeting')
     */
    dataTest(value: string): Chainable<JQuery<HTMLElement>>;
  }
}

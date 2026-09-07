/// <reference types="cypress" />

describe('icon button tooltip', () => {
  it('stays anchored to its trigger when focused right after the result animates', () => {
    cy.visit('/');

    cy.dataTest('btn-show-ciphers').click();
    cy.dataTest('btn-attempt-add-cipher-Reverse').click();
    // typing re-renders the result, which auto-animates its container
    cy.dataTest('input-plaintext').type('hello');

    // no settle time: the tooltip opens while the container is still transformed
    cy.dataTest('btn-copy').focus();
    cy.get('[role=tooltip]').should('be.visible');
    // ...and it has to stay put once that transform is gone
    cy.wait(400);

    cy.dataTest('btn-copy').then(($trigger) => {
      const trigger = $trigger[0].getBoundingClientRect();

      cy.get('[role=tooltip]').then(($tooltip) => {
        const tooltip = $tooltip[0].getBoundingClientRect();

        // sits just above the trigger, and horizontally overlaps it
        expect(trigger.top - tooltip.bottom, 'gap above trigger').to.be.within(0, 12);
        expect(tooltip.left, 'starts left of the trigger right edge').to.be.lessThan(
          trigger.right
        );
        expect(tooltip.right, 'ends right of the trigger left edge').to.be.greaterThan(
          trigger.left
        );
      });
    });
  });
});

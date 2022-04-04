# Real World Testing with Cypress TodoMVC

## Key Takeaways

- use `beforeEach()` to perform actions that will be used before every test
- move hard-coded values into variables/constants to avoid typing them every time
- `{enter}` can be used inline within the `.type` command to simulate the enter key being pressed
- the `.eq(number)` method grabs the specified number in an array of elements
- the `find()` method looks for child elements of a specific selector

```js
cy.get(".new-todo")
  .type(`${TODO_ITEM_ONE}{enter}`)
  .type(`${TODO_ITEM_TWO}{enter}`)
  .type(`${TODO_ITEM_THREE}{enter}`)
```
- The above example works because when actionable commands are chained in Cypress, the initial pointer/element is passed to each step in the chain

- Use the `commands.js` file in the cypress/support folder to add commands that can be used within the tests
- `cy.contains()` will find the appropriate text even when it is nested in several different tags
  - see test 'should append new items to the bottom of the list' (cypress/integration/app.spec.js:line 36) for an example
- use `.only()` appended to `it` to run only the specified test
  - `only` can be added to multiple tests
- `Cypress.log()`
  - receives an object with a `name` property and a `consoleProps()` property that creates a custom message to be printed to the browser's console whenever it is clicked within the test runner
  - use this to provide additional information/context to tests
  - using this can help clean up the test-runner, the `.get` and `.type` commands can take a second argument (object) with a `log` property set to true or false
    - see cypress/support/commands.js for an example
- to find values by attributes that are not usual (e.g. href attribute)
  ```js
  cy.get('a[href*="completed"]')
  ```
  - the above would search for an anchor tag with an href attribute *containing* the word 'completed'
  - it seems to use some broken form of RegEx
  ```js
  cy.get('[id&=local-]')
  ```
  - the above would search for an element that *starts* with 'local-'
  ```js
  cy.get('[id$=-remote]')
  ```
  - the above would search for an element that *ends* with '-remote'

describe('React TodoMVC', () => {
  const TODO_ITEM_ONE = 'Buy Milk'
  const TODO_ITEM_TWO = 'Pay Rent'
  const TODO_ITEM_THREE = 'Pickup Dry Cleaning'
  const TODO_ITEM_FOUR = 'Learn Cypress'
  const TODO_ITEM_FIVE = 'Eat Food'

  beforeEach(() => {
    cy.visit('http://localhost:8888')
  })

  it('adds a single todo', () => {
    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.todo-list li').should('have.length', 1)
    cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
  })

  it('adds three todos', () => {
    cy.createDefaultTodos().as('todos')
    cy.get('@todos').should('have.length', 3)
  })

  it('should append new items to the bottom of the list', () => {
    cy.createDefaultTodos().as('todos')

    // Todo 1
    cy.get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE)

    // Todo 2
    cy.get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO)

    // Todo 3
    cy.get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE)

    cy.get('.todo-count').contains('3 items left')
  })

  it('does NOT display the footer or todo-list when there are no todos', () => {
    cy.get('.footer').should('not.exist')
    cy.get('.todo-list').should('not.exist')
  })

  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5
    cy.get('.new-todo')
      .type(`${TODO_ITEM_ONE}{enter}`)
      .type(`${TODO_ITEM_TWO}{enter}`)
      .type(`${TODO_ITEM_THREE}{enter}`)
      .type(`${TODO_ITEM_FOUR}{enter}`)
      .type(`${TODO_ITEM_FIVE}{enter}`)

    cy.get('.todo-list li').should('have.length', 5)
  })

  it('focuses on the todo input field, when the app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused
    cy.focused().should('have.class', 'new-todo')
  })

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo
    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)

    cy.get('.new-todo').should('have.value', '')
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo
    cy.get('.new-todo').type(`${TODO_ITEM_ONE}{enter}`)
    cy.get('.todo-list li').eq(0).find('.toggle').check()
    cy.get('.todo-list li').eq(0).should('have.class', 'completed')
  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app
    // Hint: You will need to verify the class name of the completed todo
    cy.createDefaultTodos().as('todos')
    cy.get('@todos').eq(0).find('.toggle').click()
    cy.get('@todos').eq(1).find('.toggle').click()
    cy.get('@todos').eq(2).find('.toggle').click()
    cy.get('.clear-completed').click()
    cy.get('.todo-list').should('not.exist')
  })

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick
    cy.createDefaultTodos().as('todos')
    cy.get('@todos')
      .eq(0)
      .dblclick()
      .type(`{backspace}{backspace}{backspace}{backspace}Pizza{enter}`)
    cy.get('@todos').eq(0).contains('Buy Pizza')
  })

  it('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur
    cy.createDefaultTodos().as('todos')
    cy.get('@todos')
      .eq(0)
      .dblclick()
      .type(`{backspace}{backspace}{backspace}{backspace}Pizza`)
      .find('.edit')
      .blur()
    cy.get('@todos').eq(0).contains('Buy Pizza')
  })

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.
    cy.createDefaultTodos().as('todos')
    cy.get('.new-todo')
      .type(`${TODO_ITEM_FOUR}{enter}`)
      .type(`${TODO_ITEM_FIVE}{enter}`)
    cy.get('@todos').eq(0).find('.toggle').click()
    cy.get('@todos').eq(1).find('.toggle').click()
    cy.get('.todo-count').contains('3 items left')
  })

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload
    cy.createDefaultTodos()
    cy.reload()
    cy.get('.todo-list li').should('have.length', 3)
  })

  it('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom
    cy.createDefaultTodos().as('todos')
    cy.get('@todos').eq(0).find('.toggle').click()
    cy.get('@todos').eq(1).find('.toggle').click()
    cy.get('a[href*="completed"]').click()
    cy.get('.todo-list li').should('have.class', 'completed')
  })
})

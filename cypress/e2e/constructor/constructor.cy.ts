import token from '../../fixtures/token.json';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Интеграционное тестирование страницы конструктора', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  describe('Тестирование добавления ингредиентов из списка в конструктор', () => {
    it('Добавление одного ингредиента', () => {
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa0941] button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy=constructor_item_643d69a5c3f7b9001cfa0941]').contains(
        'Биокотлета из марсианской Магнолии'
      );
    });
    it('Добавление булок и начинки', () => {
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa093c] button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa0941] button')
        .contains('Добавить')
        .click();

      cy.get('[data-cy=constructor_bun_item]').contains('Кастомная булка');

      cy.get('[data-cy=constructor_item_643d69a5c3f7b9001cfa0941]').contains(
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Тестирование модальных окон', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa0941] a')
        .should('exist')
        .click();
    });
    it('Открытие модального окна ингредиента', () => {
      cy.get('div[data-cy=modal]')
        .should('exist')
        .contains('Биокотлета из марсианской Магнолии');
    });

    describe('Закрытие модального окна', () => {
      it('Закрытие модального окна кнопкой', () => {
        cy.get('div[data-cy=modal]')
          .should('exist')
          .get('[data-cy=btn_close]')
          .should('exist')
          .click();

        cy.get('div[data-cy=modal]').should('not.exist');
      });
      it('Закрытие модального окна кликом по оверлею', () => {
        cy.get('div[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal-overlay]')
          .should('exist')
          .click({ force: true });

        cy.get('div[data-cy=modal]').should('not.exist');
      });
    });
  });

  describe('Тестирование создания заказа', () => {
    before(() => {
      localStorage.setItem('refreshToken', token.refreshToken);
      setCookie('accessToken', token.accessToken);
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'postOrder'
      );
    });

    it('Создать заказ', () => {
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa093c] button')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa0941] button')
        .contains('Добавить')
        .click();
      cy.get('[data-cy=ingredient_item_643d69a5c3f7b9001cfa093e] button')
        .contains('Добавить')
        .click();

      cy.get('button').contains('Оформить заказ').click();

      const modal = cy.get('div[data-cy=modal]').should('exist');

      cy.get('[data-cy=order_number]').contains('46358');
      modal.get('[data-cy=btn_close]').should('exist').click();
      cy.get('div[data-cy=modal]').should('not.exist');
      cy.get('[data-cy=constructor_bun_item]').should('not.exist');
      cy.get('[data-cy=constructor_items]').contains('Выберите начинку');
    });

    after(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    });
  });
});

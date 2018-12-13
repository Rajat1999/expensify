import expensesReducer from '../../reducers/expenses';

import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});

    expect(state).toEqual([]);
});

test('should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by ID for not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

//should add an expense

test('should add an expense', () => {

    const expense = {
        id: '109',
        description: 'desc',
        note: '',
        amount: 100,
        createdAt: 0
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([...expenses, expense]);

});

test('should edit an expense', () => {

    const expense = {
        description: 'New coffee',
        amount: 121100,
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            ...expense
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state[1]).toEqual({...expenses[1], ...expense});

});

test('should not edit an expense if not found', () => {

    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount: 100
        }
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);

});

test('should set expenses', () => {

    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[1]]);

});
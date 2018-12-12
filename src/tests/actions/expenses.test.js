import * as expenses from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = expenses.removeExpense({ id: '123abc'});

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });

});

test('should setup edit expense action object', () => {
    const action = expenses.editExpense('123abc', {description: "changed", note: "changed"});

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            description: 'changed',
            note: 'changed'
        }
    });

});

test('should setup add expense action (without values)', () => {
    
    const action = expenses.addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });

});

test('should setup add expense action (with values)', () => {
    
    const expense = {
        description: 'desc',
        note: 'note',
        amount: 1000,
        createdAt: 10000
    };

    const action = expenses.addExpense(expense);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });

});
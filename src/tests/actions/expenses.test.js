import * as expenses from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expensesData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {

    const expense = {};

    expensesData.forEach(({id, description, note, amount, createdAt}) => {
        expense[id] = { description, note, amount, createdAt };
    });

    database.ref('expenses').set(expense).then(() => {
        done();
    });



});

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

test('should setup add expense action (with values)', () => {
    
    const action = expenses.addExpense(expensesData[2]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expensesData[2]
    });

});

test('should add expense to database and store', (done) => {

    const store = createMockStore({});

    const expense = {
        description: 'mouse',
        amount: 3000,
        note: 'better one',
        createdAt: 1000
    };

    store.dispatch(expenses.startAddExpense(expense)).then(() => {

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        });

        database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expense);
            done();
        });

    });

});

test('should add expense to database and store -- default values', (done) => {


    const store = createMockStore({});

    store.dispatch(expenses.startAddExpense({})).then(() => {

        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                description:'',
                amount: 0,
                createdAt: 0,
                note: '',
                id: expect.any(String)
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');

    }).then((snapshot) => {
            expect(snapshot.val()).toEqual({
                description:'',
                amount: 0,
                createdAt: 0,
                note: ''
            });
            done();
    });


});

test('should setup set expense action object with data', () => {

    const action = expenses.setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });

});
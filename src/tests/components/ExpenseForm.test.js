import React from 'react';
import { shallow } from 'enzyme';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render Expense Form correctly', () => {

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

});

test('should render Expense Form with expense data correctly', () => {

    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();

});

test('should render error for invalid form submission', () => {

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();

});

test('should set description on input change', () => {

    const value = 'newdesc';

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(0).simulate('change', {
        target:{value}
    });

    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on textarea change', () => {

    const value = 'newnote';

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('textarea').simulate('change', {
        target:{value}
    });

    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();

});

test('should set amount if valid input', () => {

    const value = '23.56';

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(1).simulate('change', {
        target:{value}
    });

    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
    
});

test('should not set amount if invalid input', () => {

    const value = '23.5611';

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(1).simulate('change', {
        target:{value}
    });

    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
    
});

test('should call onSubmit prop for valid form submission', () => {
    
    const onSubmitSpy = jest.fn();

    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');

    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });

});


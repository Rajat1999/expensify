import * as filters from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    
    const action = filters.setStartDate(moment(0));

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });

});

test('should generate set end date action object', () => {
    
    const action = filters.setEndDate(moment(10000));

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(10000)
    });

});

test('should set text filter (blank)', () => {
    
    const action = filters.setTextFilter();
    
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
    
});

test('should set text filter', () => {
    
    const action = filters.setTextFilter('hello');
    
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'hello'
    });
    
});

test('should sort by date', () => {

    const action = filters.sortByDate();

    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });

});

test('should sort by amount', () => {

    const action = filters.sortByAmount();

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });

});
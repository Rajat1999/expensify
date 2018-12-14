import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
 
    <Link className="list-item" to={`/edit/${id}`}>
      <div className="list-item__expense">
        <h3 className="list-item__description">{description}</h3>
        <span className="list-item__date">{moment(createdAt).format('MMMM Do, YYYY')}</span>
      </div>
      <div className="list-item__amount">
        <h3>{numeral(amount / 100).format('$0,0.00')}</h3>
      </div>
        
    </Link>

);

export default ExpenseListItem;

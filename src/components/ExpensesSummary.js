import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import numeral from 'numeral';
import "../locales/pt";
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'despesa' : 'despesas' ;
  numeral.locale('pt');
  const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="content-container">
         <h1 className="page-header__title"> A visualizar <span>{expenseCount}</span> {expenseWord} totalizando <span>{formattedExpensesTotal}</span></h1>
         <div className="page-header__actions">
            <Link className= "button" to = "/create"> Adicionar despesa</Link>
         </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);

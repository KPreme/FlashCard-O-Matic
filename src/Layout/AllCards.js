import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { deleteCard } from '../utils/api';

function AllCards({ cards = [] }) {
  
  //----------------------------------------------------------------------------//
  const history = useHistory();
  const { url } = useRouteMatch();
  
//---------------------------------Handling card Delete------------------------------------------//
  const deleteCardHandler = async (cardId) => {
    const response = window.confirm(
      'Delete this card? You will not be able to recover it.'
    );
    if (response) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  //-------------------------------styling the cards using map-------------------------------------//
  const styledCards = cards.map((card, index) => (
    <div key={index} className='card'>
      <div className='card-body'>
        <div className='row d-flex justify-content-between'>
          <div className='col-5'>{card.front}</div>
          <div className='col-5'>
            {card.back}
            <div>
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button className='btn btn-secondary m-3'>
                  <i className='fas fa-edit'></i> Edit
                </button>
              </Link>
              <button
                className='btn btn-danger m-3'
                onClick={() => deleteCardHandler(card.id)}
              >
                <i className='fas fa-trash'></i> Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
  //--------------------------Output----------------------------------------/
  return (
    <React.Fragment>
      <div className='card'>
        <div className='card-header text-center'>
          <h2 className='text-center'>Cards</h2>
        </div>
      </div>
      {styledCards}
    </React.Fragment>
  );
}

export default AllCards;
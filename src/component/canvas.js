import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import Modal from 'react-modal';
import { ArcherContainer, ArcherElement } from 'react-archer';
import uuid from 'react-uuid';

Modal.setAppElement('#root');

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: uuid(),
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      expanded: false,
      position: { x: 0, y: 0 },
    };
    setCards([...cards, newCard]);
  };

  const toggleExpand = (id) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, expanded: !card.expanded } : card
    ));
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const updatePosition = (id, position) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, position } : card
    ));
  };

  return (
    <div className="canvas">
      <button onClick={addCard}>Add Card</button>
      <ArcherContainer strokeColor="red">
        {cards.map((card, index) => (
          <Draggable
            key={card.id}
            position={card.position}
            onStop={(_, data) => updatePosition(card.id, { x: data.x, y: data.y })}
          >
            <ResizableBox width={200} height={100} className="box">
              <ArcherElement
                id={card.id}
                relations={
                  index > 0
                    ? [{
                        targetId: cards[index - 1].id,
                        targetAnchor: 'top',
                        sourceAnchor: 'bottom',
                        style: { strokeColor: 'blue', strokeWidth: 2 },
                      }]
                    : []
                }
              >
                <div className="card">
                  <p>
                    {card.expanded ? card.text : `${card.text.substring(0, 20)}...`}
                    <button onClick={() => toggleExpand(card.id)}>
                      {card.expanded ? "Show Less" : "Show More"}
                    </button>
                    <button onClick={() => openModal(card)}>Details</button>
                  </p>
                </div>
              </ArcherElement>
            </ResizableBox>
          </Draggable>
        ))}
      </ArcherContainer>

      {selectedCard && (
        <Modal
          isOpen={!!selectedCard}
          onRequestClose={closeModal}
          contentLabel="Card Details"
        >
          <h2>Card Details</h2>
          <p>{selectedCard.text}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Canvas;

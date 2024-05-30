document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('kanban-board');

    document.getElementById('add-column').addEventListener('click', () => {
        const columnName = prompt('Enter column name:');
        if (columnName) {
            addColumn(columnName);
        }
    });

    document.querySelectorAll('.add-card').forEach(button => {
        button.addEventListener('click', () => {
            const cardText = prompt('Enter card text:');
            if (cardText) {
                const column = button.closest('.column').querySelector('.cards');
                addCard(column, cardText);
            }
        });
    });

    function addColumn(name) {
        const column = document.createElement('div');
        column.classList.add('column');
        column.innerHTML = `
            <h2>${name}</h2>
            <div class="cards"></div>
            <button class="add-card">Add Card</button>
        `;
        board.insertBefore(column, document.getElementById('add-column'));

        column.querySelector('.add-card').addEventListener('click', () => {
            const cardText = prompt('Enter card text:');
            if (cardText) {
                const cards = column.querySelector('.cards');
                addCard(cards, cardText);
            }
        });

        column.querySelector('.cards').addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            column.querySelector('.cards').appendChild(draggingCard);
        });
    }

    function addCard(column, text) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <span>${text}</span>
            <button class="delete-card">X</button>
        `;
        column.appendChild(card);

        card.setAttribute('draggable', true);
        card.addEventListener('dragstart', () => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        card.querySelector('.delete-card').addEventListener('click', () => {
            card.remove();
        });
    }

    document.querySelectorAll('.cards').forEach(cardsContainer => {
        cardsContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingCard = document.querySelector('.dragging');
            cardsContainer.appendChild(draggingCard);
        });
    });
});


export class Model {
    getdata() {
        return Object.assign({}, state);
    }
    randomize() {
        state.columns = shuffle(state.columns);
        state.columns.forEach(c => {c.cards = shuffle(c.cards)})
    }
    getColumnById(id) {
        return state.columns.find(c => c.id == id)
    }
    removeCardFromColumn(colId, cardId) {
        let col = this.getColumnById(colId)
        col.cards = col.cards.filter(c => c.id != cardId)
    }
    addCardToColumn(colId, card, index) {
        let col = this.getColumnById(colId)
        col.cards.splice(index, 0, card)
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

var state = {
    columns: [
        {
            id: 'col1',
            name: 'TODO', 
            cards: [{id: 'card1', text: 'tex1'}, {id: 'card2', text: 'tex2'}]
        },
        {
            id: 'col2',
            name: 'In Progress', 
            cards: [{id: 'card3', text: 'tex3'}, {id: 'card4', text: 'tex4'}, {id: 'card5', text: 'tex5'}]
        },
        {
            id: 'col3',
            name: 'Done', 
            cards: [{id: 'card6', text: 'tex6'}, {id: 'card7', text: 'tex7'}, {id: 'card8', text: 'tex8'}]
        }
    ]
}
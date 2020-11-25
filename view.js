const e = React.createElement;
const { DragDropContext, Draggable, Droppable } = window.ReactBeautifulDnd;

class KanbanCard extends React.Component {
    render () {
        return e(Draggable, {draggableId: this.props.card.id, index: this.props.index}, 
            (provided) => e('div', {
                className: 'card',
                ref: provided.innerRef, 
                ...provided.dragHandleProps, 
                ...provided.draggableProps}, this.props.card.text),
        )
    }
}

class KanbanColumn extends React.Component {
    render () {
        return e('div', {className: 'col'}, [
            e('div', {className: 'col-header', key: -1}, this.props.name),
            e(Droppable, {key: 1, droppableId: this.props.id}, 
                (provided) =>  
                    e('div', {}, e('div', {
                        ref: provided.innerRef, 
                        ...provided.droppableProps, 
                        ...provided.droppablePlaceholder
                    }, this.props.cards.map((c, i) => e(KanbanCard, {key: c.id, index: i, card: c}))),
                    provided.placeholder)
            )
        ])
    }
}

export class Kanban extends React.Component {
    constructor() {
        super()
        this.onDragEnd = this.onDragEnd.bind(this)
    }
    onDragEnd(result) {
        if(!result.destination) return
        this.props.moveCard(result.source.droppableId, result.source.index, result.destination.droppableId, result.destination.index)
    }
    render () {
        return e(DragDropContext, {onDragEnd: this.onDragEnd}, this.props.state.columns.map((c, i) => e(KanbanColumn, {...c, key: c.id})))
    }
  }

export class Toolbar extends React.Component {
    render () {
        return [
            e('input', {type: "button", value: this.props.name, onClick: this.props.action, key: 1})
        ]
    }
}
  
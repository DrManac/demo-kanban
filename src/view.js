import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

class KanbanCard extends React.Component {
    render () {
        return <Draggable draggableId={this.props.card.id} index={this.props.index}>
            {
                (provided) => <div className='card' ref={provided.innerRef} 
                    {...provided.dragHandleProps} {...provided.draggableProps}>
                        {this.props.card.text}
                    </div>
            }
        </Draggable>
    }
}

class KanbanColumn extends React.Component {
    render () {
        return <div className='col'>
            <div className='col-header'>{this.props.column.name}</div>
            <Droppable droppableId={this.props.column.id}>
                {
                    (provided) => <div>
                        <div ref={provided.innerRef} {...provided.droppableProps} {...provided.droppablePlaceholder}>
                            {
                                this.props.column.cards.map((c, i) => <KanbanCard key={c.id} index={i} card={c}></KanbanCard>)
                            }
                        </div>
                        {provided.placeholder}
                    </div>
                }
            </Droppable>
        </div>
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
        return <DragDropContext onDragEnd={this.onDragEnd}>
            {
                this.props.state.columns.map((c) => <KanbanColumn key={c.id} column={c}></KanbanColumn>)
            }
        </DragDropContext>
    }
  }

export class Toolbar extends React.Component {
    render () {
        return <input type='button' value={this.props.name} onClick={this.props.action}></input>
    }
}
  
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

class KanbanCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editMode: false}
    }

    beginEditMode = () => { this.setState({name: this.props.card.text, editMode: true}); }
    endEditMode = () => { this.setState({editMode: false}); }

    onAccept = () => {
        this.props.editCardName(this.state.name, this.props.column.id, this.props.card.id);
        this.endEditMode();
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    render () {
        if (this.state.editMode)
            return <Draggable draggableId={this.props.card.id} index={this.props.index}>
                {
                    (provided) => <div className='card' ref={provided.innerRef}
                                    {...provided.dragHandleProps} {...provided.draggableProps}>
                        <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                        <input type='button' value='OK' onClick={this.onAccept} />
                        <input type='button' value='Cancel' onClick={this.endEditMode} />
                    </div>
                }
            </Draggable>
        else
            return <Draggable draggableId={this.props.card.id} index={this.props.index}>
                {
                    (provided) => <div className='card' onClick={this.beginEditMode} ref={provided.innerRef}
                            {...provided.dragHandleProps} {...provided.draggableProps}>
                            {this.props.card.text}
                            {provided.placeholder}
                            <RemoveCardButton removeCard={this.props.removeCardFromColumn} card={this.props.card.id}/>
                            {/*column={this.props.column.id}/>*/}
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
                                this.props.column.cards.map((c, i) => <KanbanCard key={c.id} index={i} card={c} removeCardFromColumn={this.props.removeCardFromColumn} column={this.props.column} editCardName={this.props.editCardName}/>)
                            }
                        </div>
                        {provided.placeholder}
                        <AddCardButton addCard={this.props.createCard} column={this.props.column.id}/>
                    </div>
                }
            </Droppable>
        </div>
    }
}


export class AddColumnButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editMode: false}
    }

    beginEditMode = () => { this.setState({name: 'New column', editMode: true}); }
    endEditMode = () => { this.setState({editMode: false}); }

    onAccept = () => {
        this.props.createColumn(this.state.name);
        this.endEditMode();
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    render() {
        let content;
        if (this.state.editMode)
            content = <div className='card'>
                Enter column name
                <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                <input type='button' value='OK' onClick={this.onAccept} />
                <input type='button' value='Cancel' onClick={this.endEditMode} />
            </div>
        else
            content = <div className='card_button' onClick={this.beginEditMode}>
                Add Column...
            </div>

        return <div className='col_empty'>
            {content}
        </div>
    }
}

export class AddCardButton extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {editMode: false}
    }

    beginEditMode = () => { this.setState({name: 'New card', editMode: true}); }
    endEditMode = () => { this.setState({editMode: false}); }

    onAccept = () => {
        this.props.addCard(this.state.name, this.props.column);
        this.endEditMode();
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    render() {
        let content;
        if (this.state.editMode)
            content = <div className='card'>
                Enter card name
                <input type='text' value={this.state.name} onChange={this.handleNameChange}/>
                <input type='button' value='OK' onClick={this.onAccept} />
                <input type='button' value='Cancel' onClick={this.endEditMode} />
            </div>
        else
            content = <div className='card_button' onClick={this.beginEditMode}>
                Add Card...
            </div>

        return <div className='card_empty'>
            {content}
        </div>
    }
}


export class RemoveCardButton extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {editMode: false}
    }
    remove = () => {
        this.props.removeCard(this.props.card)
    }

    render() {
        return (
            <button className="rm_card_button" style={{ float: "right" }} onClick={this.remove}>
                X
            </button>

        );
    }
}


export class Kanban extends React.Component {
    constructor(props) {
        super(props)
        this.onDragEnd = this.onDragEnd.bind(this)
    }
    onDragEnd(result) {
        if(!result.destination) return
        this.props.moveCard(result.source.droppableId, result.source.index,
            result.destination.droppableId, result.destination.index)
    }
    render () {
        return <DragDropContext onDragEnd={this.onDragEnd}>
            {
                this.props.state.columns.map((c) => <KanbanColumn key={c.id} column={c} createCard={this.props.createCard}
                                                                  removeCardFromColumn={this.props.removeCardFromColumn}
                                                                  editCardName={this.props.editCardName}/>)
            }
            <AddColumnButton createColumn={this.props.createColumn}/>
        </DragDropContext>
    }
}

export class Toolbar extends React.Component {
    render () {
        return <input type='button' value={this.props.name} onClick={this.props.action}/>
    }
}
  

import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { ListGroup, ListGroupItem, Form, Button, Row, Col } from 'react-bootstrap';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  // Save data to localStorage whenever the todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (inputValue === '') {
      return;
    }

    const newTodo = {
      id: Math.random(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  }

  function handleToggle(todo) {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodos(updatedTodos);
  }

//   function handleDelete(id) {
//     const updatedTodos = todos.filter(todo => todo.id !== id);
//     setTodos(updatedTodos);
//   }

  function handleDeleteAll() {
    setTodos([]);
  }

  return (
    <div className="p-3 instruction-box profileText mt-4" style={{padding: '30px', borderRadius: "15px", margin: 0}}>
      <Form className="mt-3" onSubmit={e => e.preventDefault()}>
        <div className="mb-4">
            <Row>
                <Col className="justify-content-start">
                    <span style={{fontWeight: 'bold', color: '#4c4c4c'}}>To-Do List</span>
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleAddTodo} style={{ marginRight: '10px' }}>
                    <i className="fas fa-plus"></i>
                    </Button>
                    <span>Add A Task</span>
                </Col>
                <Col xs={3} className="justify-content-end">
                    <h6 style={{fontWeight: 'bold', color: '#C4C4C4'}}>Today</h6>
                    <span style={{fontWeight: 'bold', color: '#4c4c4c'}}>{moment().format(' Do MMMM ')}</span>
                </Col>
            </Row>
        </div>
      <ListGroup>
        {todos.map(todo => (
          <ListGroupItem
            key={todo.id}
            className="d-flex justify-content-between align-items-center mb-3"
            active={todo.completed}
            onClick={() => handleToggle(todo)}
          >
            <div className={todo.completed ? "text-decoration-line-through" : ""}>{todo.text}</div>
            <i className={`fas ${todo.completed ? "fa-check-square" : "fa-square"}`} onClick={() => handleToggle(todo)}></i>
          </ListGroupItem>
        ))}
      </ListGroup>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Add a task"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="danger" className="ms-2" onClick={handleDeleteAll}>
          <i className="fas fa-trash"></i><span></span>
        </Button>
      </Form>
    </div>
  );
}

export default TodoList;

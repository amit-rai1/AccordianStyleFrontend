import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { userRegister } from './service/authService';
import { useDispatch } from 'react-redux';
import { setCategory } from './slice/CategorySlice';
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [input, setInput] = useState({
    title: '',
    description: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      title: input.title,
      description: input.description,
      category: input.category
    };
    const res = await userRegister(requestData);
    console.log(res, "api");
    if (res.status === 200) {
      dispatch(setCategory(input.category)); // dispatching action to set category data in Redux store
      alert("success")
      navigate("/");
    
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
      <h4>React-Bootstrap Form Component</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Title"
            name="title"
            value={input.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Description"
            name="description"
            value={input.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Category"
            name="category"
            value={input.category}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Blog
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlogForm;

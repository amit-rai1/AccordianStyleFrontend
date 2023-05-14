import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';
// import { getArticleById, updateArticle } from './service/articleService';
import { getArticleById, updateArticle } from './service/authService';
import { useNavigate } from "react-router-dom";


const UpdateBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getArticleById(id);
        console.log(res.article,"abc1");
        if (res.article) {
          setInput(res.article);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      title: input.title,
      description: input.description,
      category: input.category,
    };
    const res = await updateArticle(id, requestData);
    if (res.status === 200) {
      alert('Blog updated successfully!');
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
         <div style={{ display: 'block', width: 700, padding: 30 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Title"
            name="title"
            value={input.title || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Description"
            name="description"
            value={input.description || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Category"
            name="category"
            value={input.category || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Blog
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default UpdateBlogForm;

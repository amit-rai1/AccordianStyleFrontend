import React, { useState, useEffect } from "react";
import { getArticles } from "./service/authService";
import { deleteArticleById } from "./service/authService";
import { searchData } from "./service/authService";
import moment from "moment";
import "./blogList.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Button, Card, Row, Col, Form } from "react-bootstrap";

const BlogList = () => {
  const category = useSelector((state) => state.category);
  console.log(category,"category111");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles();
      setArticles(response);
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteArticleById(id);
    window.location.reload();
    if (res.status === 200) {
      setArticles((prevState) => prevState.filter((a) => a._id !== id));
    }
  };

  const searchHandler = async (e) => {
    console.log(e);
    if (e.trim() !== "") {
      const response = await searchData(e);
      console.log(response.data.result);
      setArticles(response.data.result);
    } else {
      setArticles([]);
      const response = await getArticles(); // fetch all articles
      setArticles(response); // reset articles state
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Blog</h1>
      <Form>
        <Form.Group controlId="formBasicSearch">
          <Form.Label>Search</Form.Label>
          <Row>
            <Col sm={10}>
              <Form.Control
                type="search"
                placeholder="Search by title or category"
                onChange={(e) => searchHandler(e.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button variant="secondary" onClick={() => searchHandler("")}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      {articles?.length > 0 ? (
        <Row>
          {articles.map((article) => (
            <Col xs={12} sm={6} md={4} key={article._id}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{article?.title}</Card.Title>
                  <Card.Text>{article?.description}</Card.Text>
                  <Card.Text>{article?.category}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small>
                      {moment(article?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </small>
                    <div className="btn-group">
                      <Link
                        to={"/CreateBlogForm"}
                        className="btn btn-sm btn-primary"
                      >
                        Create Blog
                      </Link>
                      <Link
                        to={`/editBlog/${article._id}`}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(article._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default BlogList;

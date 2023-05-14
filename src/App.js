import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from "react-router-dom"
import CreateBlogForm from "./features/blogForm";
import BlogList from './features/blogList';
import UpdateBlogForm from './features/UpdateBlogForm';
// import store from './redux/store';
// import store from './features/store/store';
import store from './features/store/Store';


function App() {
  return (
    <Provider store={store}>
      <div>
        <Routes>
        <Route path="/" element={ <BlogList/> } />
          <Route path="/CreateBlogForm" element={ <CreateBlogForm/> } />
          <Route path="/editBlog/:id" element={<UpdateBlogForm />} />

        </Routes>
      </div>
     </Provider>
  );
}

export default App;

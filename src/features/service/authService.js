import axios from "axios";
// import { apiUrl,PORT } from "../../environment";
import {apiUrl,PORT} from '../../../src/environment'
import { getInfo } from "./Auth.header";


const TOKEN = getInfo();
let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
};
let option = {
    headers: {
      Authorization: TOKEN,
      "Content-Type": `multipart/form-data`,
    },
  };
// function for Restro Registration
// export const userRegister = async (fromdata) => {
//   try {
//     const response = await axios.post(
//       `${apiUrl}${PORT}/users/signup`,
//       fromdata,
//       axiosConfig
//     );
//     console.log(fromdata, "fromdata16");
//     console.log(response, "response>>>>>>>>>>>");

//     return response;
//   } catch (e) {
//     return null;
//   }
// };
// export const userRegister = async(fromdata)=>
// {
//     try{
//         const response = await axios.post(
//             `${apiUrl}${PORT}/articles/createarticle`,fromdata,axiosConfig
//         );
//         console.log(fromdata,"fromdata41");
//         return response;
//     }catch (e){
//         return null;
//     }
// };
export const userRegister = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}${PORT}/articles/createarticle`, formData, axiosConfig);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Server Error');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
// export const getArticles = async (sort,date) => {
 
//   try {
//     let url = `${apiUrl}${PORT}/articles/getArticles?sort=${sort}`;
//     if (date) {
//       url += `&date=${date.toISOString()}`;
//     }
//     const response = await axios.get(url);
//     console.log(response.data,"107");
//     ;
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
export const getArticles = async () => {
  try {
    const response = await axios.get(`${apiUrl}${PORT}/articles/getArticles`);
    console.log(response.data,"88");
    return response.data;
   
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const updateArticle = async (id, data) => {
  console.log(id,"72line");
  console.log(data,"73line");

  try {
    const response = await axios.put(`${apiUrl}${PORT}/articles/updateArticle/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response.data.message);
  }
};

export const getArticleById = async (id) => {
  console.log(id,"idddd");
  try {
    const response = await axios.get(`${apiUrl}${PORT}/articles/getArticleById/${id}`);
    console.log(response.data,"88");
    return response.data;
   
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteArticleById = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}${PORT}/articles/deleteArticle/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const searchData = async (Key) => {
  return await axios.get(`${apiUrl}${PORT}/articles/articlesearch/${Key}`,
      axiosConfig)
}
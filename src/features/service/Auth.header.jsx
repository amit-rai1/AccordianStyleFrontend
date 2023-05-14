export const getInfo = () => {
    let user = localStorage.getItem("user");
    
    user = JSON.parse(user);
    return user;
  };
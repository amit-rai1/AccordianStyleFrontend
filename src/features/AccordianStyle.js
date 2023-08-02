import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';
import './AccordianStyle.css';

const AccordianStyle = () => {
  const [data, setData] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/data');
      console.log('Fetched data:', response.data); // Add this log to check the data
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const toggleMenu = () => {
    setMenuOpen((prevMenuState) => !prevMenuState);
  };

  return (
    <div className={`app ${darkTheme ? 'dark' : 'light'}`}>
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className="menu">
          <li className="menu-item">Home</li>
          {/* Add more menu items here */}
        </ul>
        <div className="theme-toggle" onClick={toggleTheme}>
          <FontAwesomeIcon icon={darkTheme ? faSun : faMoon} />
        </div>
      </div>
      <div className="content">
        <div className="accordion">
          {/* Add a conditional check for data existence */}
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <AccordionItem key={index} item={item} />
            ))
          ) : (
            <div>Loading data...</div>
          )}
        </div>
      </div>
    </div>
  );
}

const AccordionItem = ({ item, selectAll, setSelectAll }) => {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={`accordion-item ${open ? 'active' : ''}`}>
      <div className="accordion-title" onClick={handleItemClick}>
        {item.path}
      </div>
      {item.children && item.children.length > 0 ? (
        <div className="nested-accordion">
          {item.children.map((childGroup, groupIndex) => (
            <div key={groupIndex}>
              {childGroup.children ? (
                childGroup.children.map((child, index) => (
                  <div key={index} className="nested-item">
                     <input type="checkbox" checked={selectAll} onChange={() => setSelectAll(!selectAll)} />
                    <a href={child.url} target="_blank" rel="noopener noreferrer">
                      {child.path}
                    </a>
                    <span>{child.size}</span>
                  </div>
                ))
              ) : (
                <div className="nested-item">
                    <input type="checkbox" checked={selectAll} onChange={() => setSelectAll(!selectAll)} />
                  <a href={childGroup.url} target="_blank" rel="noopener noreferrer">
                    {childGroup.path}
                  </a>
                  <span>{childGroup.size}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="nested-accordion">
          <div className="nested-item">
            <input type="checkbox" />
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.path}
            </a>
            <span>{item.size}</span>
          </div>
        </div>
      )}
    </div>
  );


};

export default AccordianStyle;

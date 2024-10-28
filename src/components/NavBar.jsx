import React, { useState } from 'react';
import '../style/NavBar.css'
const NavigationMenu = ({ setSelectedGrouping, sortBy, setSortBy }) => {  // Fixed prop names to match parent component
  const currentGrouping = localStorage.getItem('viewPreference') || 'user';
  const currentOrdering = localStorage.getItem('viewOrdering') || 'priority';
  const [menuOpen, setMenuOpen] = useState(false);
  const [groupingOpen, setGroupingOpen] = useState(false);
  const [sortingOpen, setSortingOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(sortBy || 'priority');  // Use sortBy from props

  const groupingChoices = ['user', 'status', 'priority'].filter(
    choice => choice !== currentGrouping
  );
  
  const orderingChoices = ['title', 'priority'].filter(
    choice => choice !== selectedOrder
  );

  const handleGroupingSelect = (selection) => {
    setSelectedGrouping(selection);  // Using the correct prop function
    localStorage.setItem('viewPreference', selection);
    setGroupingOpen(false);
    // setMenuOpen(false);  // Close main menu after selection
  };

  const handleOrderSelect = (selection) => {
    setSortBy(selection);  // Using the correct prop function
    setSelectedOrder(selection);
    localStorage.setItem('viewOrdering', selection);
    setSortingOpen(false);
    // setMenuOpen(false);  // Close main menu after selection
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-wrapper')) {
        setMenuOpen(false);
        setGroupingOpen(false);
        setSortingOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="nav-container">
      <div className="menu-wrapper">
        <button 
          onClick={(e) => {
            e.stopPropagation();  // Prevent event bubbling
            setMenuOpen(!menuOpen);
          }}
          className="display-button"
        >
          <span className="menu-icon">☰</span>
          Display
          <span className="chevron-icon">▼</span>
        </button>

        <div className={`menu-dropdown ${menuOpen ? 'show' : ''}`}>
          <div className="menu-row">
            <span className="menu-label"><b>Grouping</b></span>
            <div className="custom-select">
              <div 
                className="select-trigger"
                onClick={(e) => {
                  e.stopPropagation();  // Prevent event bubbling
                  setGroupingOpen(!groupingOpen);
                  setSortingOpen(false);
                }}
              >
                {currentGrouping}
                <span className="select-arrow">▼</span>
              </div>
              {groupingOpen && (
                <div className="select-options">
                  {groupingChoices.map(option => (
                    <div
                      key={option}
                      className="select-option"
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent event bubbling
                        handleGroupingSelect(option);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="menu-row">
            <span className="menu-label"><b>Ordering</b></span>
            <div className="custom-select">
              <div 
                className="select-trigger"
                onClick={(e) => {
                  e.stopPropagation();  // Prevent event bubbling
                  setSortingOpen(!sortingOpen);
                  setGroupingOpen(false);
                }}
              >
                {selectedOrder}
                <span className="select-arrow">▼</span>
              </div>
              {sortingOpen && (
                <div className="select-options">
                  {orderingChoices.map(option => (
                    <div
                      key={option}
                      className="select-option"
                      onClick={(e) => {
                        e.stopPropagation();  // Prevent event bubbling
                        handleOrderSelect(option);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import TicketManager from './components/TicketPage';
function App() {
  const [selectedGrouping, setSelectedGrouping] = useState('user');
  const[sortBy,setSortBy]=useState('priority');
  console.log(sortBy)

  return (
    <div className="App">
         <NavBar sortBy={sortBy} setSortBy={setSortBy} selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
         <TicketManager sortBy={sortBy} setSortBy={setSortBy} selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
    </div>
  );
}

export default App;

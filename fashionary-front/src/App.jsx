import logo from './logo.svg';
import './App.css';
import {Home} from './cmps/Home.jsx'
import Navbar from './cmps/Navbar.jsx'
import { DynamicPopover } from './cmps/DynamicPopover'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
        <Home/>
        <DynamicPopover />
    </div>
  );
}

export default App;

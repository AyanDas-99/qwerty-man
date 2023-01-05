import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { Output } from './pages/output';

function App() {
  return (
    <div className="App">
      <></>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result' element={<Output />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

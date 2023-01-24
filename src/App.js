import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { About } from './pages/about';
import { Output } from './pages/output';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navbar } from './components/navbar';
import { Timeline } from './pages/timeline';
import Contact from './pages/contact';

function App() {

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <></>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result' element={<Output />} />
            <Route path='/about' element={<About />} />
            <Route path='/timeline' element={<Timeline />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;

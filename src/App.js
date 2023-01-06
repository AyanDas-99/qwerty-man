import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { Output } from './pages/output';
import { QueryClient, QueryClientProvider } from 'react-query'

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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/result' element={<Output />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;

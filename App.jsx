import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Debugger from './pages/Debugger';
import Compiler from './pages/Compiler';
import Performance from './pages/Performance';
import Rewriter from './pages/Rewriter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analysis" element={<Analysis />} />
          <Route path="debugger" element={<Debugger />} />
          <Route path="compiler" element={<Compiler />} />
          <Route path="performance" element={<Performance />} />
          <Route path="rewriter" element={<Rewriter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
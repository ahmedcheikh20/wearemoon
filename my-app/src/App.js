
import './App.css';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
    <Nav />
    <div className="container">
      {/* <Register/> */}
      <Login/>
    </div>
  </div>
  );
}

export default App;

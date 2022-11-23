import Navbar from './components/navbar.js'
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/home.js';
import Footer from './components/footer.js'
import Signup from './components/signup.js';
import Signin from './components/signin.js';
import Rent from './components/addrent.js';
import Specificsearch from './components/specificsearch.js'
import View from './components/view.js';
import About from './components/about.js'
import Action from './components/actions.js';
import Recent from './components/recent.js';
function App() {
  return (
    <>

    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Signin" element={<Signin/>} />
      <Route path="/Sell/Rent" element={<Rent/>} />
      <Route path='/search/:id' element={<Specificsearch/>} />
      <Route path='/view/:id' element={<View/>} />
      <Route path='/aboutUs' element={<About/>}/>
      <Route path='/admin/workground/actions' element={<Action/>} />
      <Route path='/admin/workgroud/recents' element={<Recent/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;

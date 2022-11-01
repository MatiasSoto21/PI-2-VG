import { Route } from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';
import Home from './Components/Home';
import Detail from './Components/Detail';
import Post from './Components/Post';


function App() {
  return (
    <div>
      <Route exact path="/" component={Landing}/>
      <Route path="/home" component={Home}/>
      <Route path="/detail/:id" component={Detail}/>
      <Route path="/post" component={Post}/>
    </div>
  );
}

export default App;

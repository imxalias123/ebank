import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm'
// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={LoginForm} />
  </Switch>
)

export default App

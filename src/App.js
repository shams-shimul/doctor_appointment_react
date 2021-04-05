import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Error from './pages/Error';
import Schedule from './pages/Schedule';
import BookingCheckout from './pages/BookingCheckout';
import BookingDone from './pages/BookingDone';

const App = () => {

  return (
    <Router>
      <Navigation />
      <div className="content">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/doctors/:handle/schedule" children={<Schedule />} />
            <Route path="/doctors/:handle/appointment">
              <BookingCheckout />
            </Route>
            <Route path="/doctors/:handle/appointment-confirmation">
              <BookingDone />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

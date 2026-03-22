import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Genres from './components/genres/Genres';
import Directors from './components/directors/Directors';
import Producers from './components/producers/Producers';
import Types from './components/types/Types';
import Media from './components/media/Media';
import './App.css';
import './AdminLayout.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <main className="main-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/genres" component={Genres} />
          <Route path="/directors" component={Directors} />
          <Route path="/producers" component={Producers} />
          <Route path="/types" component={Types} />
          <Route path="/media" component={Media} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';
import Support from './components/support';
import Navbar from './components/navbar';
import Forum from './components/forum/forum';
import Boards from './components/boards';
import Topics from './components/topics';
import Replies from './components/replies';
import {hideElement} from './components/util.js';
import GamesTable from './components/gamesTable';
import {getPopularGameData, getPriceyGameData, setActiveNavLink, adjustPrice, getGameById, getUserData, searchForFeedItems} from './server';

import Favorite from './components/forum/forumTopics/favorite';
import General from './components/forum/forumTopics/general';
import OffTopic from './components/forum/forumTopics/offtopic';
import Predictions from './components/forum/forumTopics/predictions';
import Price from './components/forum/forumTopics/price';
import ForumSupport from './components/forum/forumTopics/support';

import About from './components/about';
import MyProfile from './components/myprofile';
import Games from './components/games';
import ErrorBanner from './components/errorbanner'
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

class SearchResultsPage extends React.Component {
  getSearchTerm() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = "";
    if (queryVars && queryVars.q) {
      searchTerm = queryVars.q;
      // Remove extraneous whitespace.
      searchTerm.trim();
    }
    return searchTerm;
  }

  render() {
    var searchTerm = this.getSearchTerm();
    // By using the searchTerm as the key, React will create a new
    // SearchResults component every time the search term changes.
    return (
      <SearchResults key={searchTerm} searchTerm={searchTerm} />
    );
  }
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      invalidSearch: false,
      results: ""
    };
  }

  refresh() {
    var searchTerm = this.props.searchTerm;
    if (searchTerm !== "") {
      // Search on behalf of user 4.

      searchForFeedItems(4, searchTerm, (feedItems) => {
        var games = feedItems;
        // var games = new Array(feedItems.size);
        // for(var j = 0; j < games.length; j++){
        //   games[j] = feedItems[j];
        // }
        getGameById(games, (games) => {
          this.setState({
            loaded: true,
            results: games
          });
        });
      });
    } else {
      this.setState({
        invalidSearch: true
      });
    }

      getUserData("4", (user) => {
        this.setState({"user": user });
      });
  }


  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <h2>SearchResults</h2>
        <GamesTable games={this.state.results} user={this.state.user} />
      </div>
    );
  }
}


class App extends React.Component {

  render() {
    return (
      <div>
        <Navbar />
          <div className="row">
            <div className="col-md-12">
              <ErrorBanner />
            </div>
          </div>
        <div className="main-content container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="support" component={Support}/>
      <Route path="home" component={Home} />
      <Route path="myProfile" component={MyProfile} />
      <Route path="games" component={Games} />

      <Route path="boards" component={Boards} />
      <Route path="topics/:id" component={Topics} />
      <Route path="replies/:id" component={Replies} />

      <Route path="search" component={SearchResultsPage} />

    </Route>
  </Router>
),document.getElementById('main-content'));

import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, useQuery, } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import GetEvents from './Components/GetEvents';
import {GET_ALL_EVENTS, GET_EVENT } from './GraphQL/Queries';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`GraphQL Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: "https://api.hackthenorth.com/v3/graphql"})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function EventBubble({ event }) {
  return (
    <div className="event-bubble right-half">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{Date(event.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} - {Date(event.end_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
    </div>
  );
}

function EventList() {
  const { loading, error, data } = useQuery(GET_ALL_EVENTS);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error fetching events.</p>;

  const events = data.sampleEvents;

  return (
    <div className="event-list">
      {events.map(event => (
        <EventBubble key={event.id} event={event} />
      ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <GetEvents /> 
      <div className="App">
      <div className="left-panel">
        <h1>Welcome to Hack The North!</h1>
        <h2>Events Calendar</h2>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
        <div className="right-panel">
          <EventList />
        </div>
      </div>
    </ApolloProvider>
  );
}


export default App;

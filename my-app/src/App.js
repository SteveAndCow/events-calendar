import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`GraphQL Error ${message}`);
    });
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "https://api.hackthenorth.com/v3/graphql"})
])

const client = new ApolloClient({
  cache: new InMemoryCache,
  link: link
})

function App() {
  return <ApolloProvider client={client}>(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )</ApolloProvider>;
}

export default App;

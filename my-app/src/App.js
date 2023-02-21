import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import GetEvents from './Components/GetEvents';

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

function App() {
  return (
  <ApolloProvider client={client}>
    {" "}
    <GetEvents />
  </ApolloProvider>
  );
}

export default App;

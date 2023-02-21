import { gql } from "@apollo/client"; 

export const LOAD_ALL_EVENTS = gql`
# queries all sampleEvents on all fields
# returns TEvent[]
query {
  sampleEvents {
    id
    name
    event_type
    permission
    start_time
    end_time
    description
    speakers {
      name
    }
    public_url
    private_url
    related_events
  }
}
`;
export const EVENT_QUERY = gql
`# queries a specific sampleEvent by id on a subset of all fields
# returns TEvent
query {
  sampleEvent (id: Int) {
    id
    name
    event_type
    permission
    start_time
    end_time
    description
  }
}`;
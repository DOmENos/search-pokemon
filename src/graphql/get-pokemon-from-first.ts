import { gql } from "@apollo/client";

const GetPokemonFromFirst = gql`
  query GetPokemonFromFirst($count: Int!){
  pokemons(first: $count) {
    id
    number
    name
    image
    types
  }
}
`;
export default GetPokemonFromFirst 
 
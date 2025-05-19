import { gql } from "@apollo/client";

const RandomSuggestPokemon = gql`
  query GetPokemonFromFirst($count: Int!) {
    pokemons(first: $count) {
      name
    }
  }
`;
export default RandomSuggestPokemon 
 
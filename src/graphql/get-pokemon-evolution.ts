import { gql } from "@apollo/client";

const GetEvolutionPokemon = gql`
  query GetEvolutionPokemon($name: String!){
  pokemon(name: $name) {
    id
    image
    name
  }
}
`;
export default GetEvolutionPokemon 
 
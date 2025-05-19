import { gql } from "@apollo/client";

const GetReverseEvolution = gql`
  query query GetPokemon($name: String!){
  pokemon(name: $name) {
    name
    image
    evolutions {
      name
    }
    evolutionRequirements {
      amount
      name
    }
  }
}
`;
export default GetReverseEvolution 
 
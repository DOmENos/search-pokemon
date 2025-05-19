// "use client";
// import { render, screen } from '@testing-library/react';
// import { gql, useQuery } from '@apollo/client';
// import PokemonResult from '@/components/pokemon-result/PokemonResult';
// import { TypeColors } from '@/components/pokemon-result/PokemonResultType';

// const mockBulbasaurData = {
//   pokemon: {
//     name: 'Bulbasaur',
//     types: [{ type: { name: 'Grass' } }, { type: { name: 'Poison' } }], 
//   },
// };

// const mockCharmanderData = {
//   pokemon: {
//     name: 'Charmander',
//     types: [{ type: { name: 'Fire' } }],
//   },
// };

// const mockSquirtleData = {
//   pokemon: {
//     name: 'Squirtle',
//     types: [{ type: { name: 'Water' } }],
//   },
// };

// const mockUseQuery = useQuery as jest.Mock; 

// jest.mock('@apollo/client', () => ({
//   ...jest.requireActual('@apollo/client'),
//   useQuery: jest.fn(),
// }));

// describe('PokemonResult Component', () => {
//   beforeEach(() => {
//     mockUseQuery.mockClear(); 
//   });

//   it('should display "Grass" badge for Bulbasaur', () => {
//     mockUseQuery.mockReturnValue({
//       loading: false,
//       error: undefined,
//       data: mockBulbasaurData,
//     });
//     render(<PokemonResult name="Bulbasaur" />);
//     const badgeElement = screen.getByText('Grass');
//     expect(badgeElement).toBeInTheDocument();
//     expect(badgeElement.className).toContain(TypeColors['Grass']);
//   });

//   it('should display "Fire" badge for Charmander', () => {
//     mockUseQuery.mockReturnValue({
//       loading: false,
//       error: undefined,
//       data: mockCharmanderData,
//     });
//     render(<PokemonResult name="Charmander" />);
//     const badgeElement = screen.getByText('Fire');
//     expect(badgeElement).toBeInTheDocument();
//     expect(badgeElement.className).toContain(TypeColors['Fire']);
//   });

//   it('should display "Water" badge for Squirtle', () => {
//     mockUseQuery.mockReturnValue({
//       loading: false,
//       error: undefined,
//       data: mockSquirtleData,
//     });
//     render(<PokemonResult name="Squirtle" />);
//     const badgeElement = screen.getByText('Water');
//     expect(badgeElement).toBeInTheDocument();
//     expect(badgeElement.className).toContain(TypeColors['Water']);
//   });

//   it('should handle loading state', () => {
//     mockUseQuery.mockReturnValue({
//       loading: true,
//       error: undefined,
//       data: undefined,
//     });
//     render(<PokemonResult name="Bulbasaur" />);
//     expect(screen.getByRole('progressbar')).toBeInTheDocument(); 
//   });

//   it('should handle error state', () => {
//     mockUseQuery.mockReturnValue({
//       loading: false,
//       error: new Error('GraphQL Error'),
//       data: undefined,
//     });
//     render(<PokemonResult name="NonExistentPokemon" />);
//     expect(screen.getByText('Pokémon Not Found')).toBeInTheDocument();
//   });

//   it('should render null if no name prop is provided', () => {
//     render(<PokemonResult name="" />);
//     expect(screen.queryByTestId('pokemon-result-card')).toBeNull();
//   });
// });
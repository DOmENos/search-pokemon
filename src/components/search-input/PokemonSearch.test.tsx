// import { render, screen, fireEvent } from '@testing-library/react';
// import { useRouter, useSearchParams } from 'next/navigation';

// import PokemonSearch from './PokemonSearch';

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
//   useSearchParams: jest.fn(),
// }));

// describe('PokemonSearch Component', () => {
//   let mockRouterPush: jest.Mock<any, any, any>;
//   let mockSearchParamsGet: jest.Mock<any, any, any>;
//   let mockSearchParams;

//   beforeEach(() => {
//     mockRouterPush = jest.fn();
//     mockSearchParamsGet = jest.fn();
//     mockSearchParams = { get: mockSearchParamsGet };

//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockRouterPush,
//     });
//     (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
//   });

//   it('renders the search input and button', () => {
//     render(<PokemonSearch />);
//     const inputElement = screen.getByPlaceholderText('Enter Pokémon name...');
//     const searchButton = screen.getByRole('button', { name: /search/i });
//     expect(inputElement).toBeInTheDocument();
//     expect(searchButton).toBeInTheDocument();
//   });

//   it('updates the search term when the input value changes', () => {
//     render(<PokemonSearch />);
//     const inputElement = screen.getByPlaceholderText('Enter Pokémon name...');
//     fireEvent.change(inputElement, { target: { value: 'Pikachu' } });
//     expect(inputElement).toHaveValue('Pikachu');
//   });

//   it('navigates to the correct URL when the search button is clicked with a term', () => {
//     render(<PokemonSearch />);
//     const inputElement = screen.getByPlaceholderText('Enter Pokémon name...');
//     const searchButton = screen.getByRole('button', { name: /search/i });
//     fireEvent.change(inputElement, { target: { value: 'Charizard' } });
//     fireEvent.click(searchButton);
//     expect(mockRouterPush).toHaveBeenCalledWith('/?name=Charizard');
//   });

//   it('does not navigate if the search term is empty when the button is clicked', () => {
//     render(<PokemonSearch />);
//     const searchButton = screen.getByRole('button', { name: /search/i });
//     fireEvent.click(searchButton);
//     expect(mockRouterPush).not.toHaveBeenCalled();
//   });

//   it('renders the suggestion buttons', () => {
//     render(<PokemonSearch />);
//     const suggestionButtons = screen.getAllByRole('button', { name: /pikachu|charizard|bulbasaur|squirtle|eevee/i });
//     expect(suggestionButtons).toHaveLength(5);
//   });

//   it('updates the search term and navigates when a suggestion button is clicked', () => {
//     render(<PokemonSearch />);
//     const bulbasaurButton = screen.getByRole('button', { name: 'Bulbasaur' });
//     fireEvent.click(bulbasaurButton);
//     const inputElement = screen.getByPlaceholderText('Enter Pokémon name...');
//     expect(inputElement).toHaveValue('Bulbasaur');
//     expect(mockRouterPush).toHaveBeenCalledWith('/?name=Bulbasaur');
//   });

//   it('initializes the search term from the search params if available', () => {
//     mockSearchParamsGet.mockReturnValue('Squirtle');
//     render(<PokemonSearch />);
//     const inputElement = screen.getByPlaceholderText('Enter Pokémon name...');
//     expect(inputElement).toHaveValue('Squirtle');
//   });

//   it('renders the Pokeball icon and animates it on hover', () => {
//     render(<PokemonSearch />);
//     const pokeballIcon = screen.getByRole('img'); 
//     const searchButton = screen.getByRole('button', { name: /search/i });

//     expect(pokeballIcon).toBeInTheDocument();
//     expect(pokeballIcon).not.toHaveClass('animate-spin');

//     fireEvent.mouseEnter(searchButton);
//     expect(pokeballIcon).toHaveClass('animate-spin');

//     fireEvent.mouseLeave(searchButton);
//     expect(pokeballIcon).not.toHaveClass('animate-spin');
//   });
// });
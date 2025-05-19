// import { render, screen, waitFor, act } from '@testing-library/react';
// import { MockedProvider } from '@apollo/client/testing';
// import { useRouter } from 'next/navigation';
// import PokemonCard from '@/components/sample-pokemon/PokemonCard';


// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
// }));

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: jest.fn(({ src, alt, width, height, className }) => (
//     <img src={src} alt={alt} width={width} height={height} className={className} />
//   )),
// }));

// const mockPokemon = {
//   name: 'Pikachu',
//   number: '025',
//   image: 'https://example.com/pikachu.png',
//   classification: 'Electric Mouse Pokémon',
//   types: ['Electric'],
//   maxHP: 300,
// };

// const mockQuerySuccess = [
//   {
//     request: {
//       query: expect.any(Object), 
//       variables: { name: 'Pikachu' },
//     },
//     result: {
//       data: { pokemon: mockPokemon },
//     },
//   },
// ];

// const mockQueryLoading = [
//   {
//     request: {
//       query: expect.any(Object),
//       variables: { name: 'Pikachu' },
//     },
//     result: {
//       loading: true,
//     },
//   },
// ];

// const mockQueryError = [
//   {
//     request: {
//       query: expect.any(Object),
//       variables: { name: 'Pikachu' },
//     },
//     error: new Error('GraphQL Error'),
//   },
// ];

// describe('PokemonCard Component', () => {
//   let mockRouterPush: jest.Mock<any, any, any>;

//   beforeEach(() => {
//     mockRouterPush = jest.fn();
//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockRouterPush,
//     });
//   });

//   it('renders loading state correctly', () => {
//     render(
//       <MockedProvider mocks={mockQueryLoading} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//     expect(screen.getByRole('img')).toHaveClass('animate-pulse'); 
//   });

//   it('renders error state correctly', async () => {
//     render(
//       <MockedProvider mocks={mockQueryError} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Error loading Pikachu')).toBeInTheDocument();
//     });
//   });

//   it('renders Pokemon data correctly on successful query', async () => {
//     render(
//       <MockedProvider mocks={mockQuerySuccess} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Pikachu')).toBeInTheDocument();
//       expect(screen.getByText('Electric Mouse Pokémon')).toBeInTheDocument();
//       expect(screen.getByText('#025')).toBeInTheDocument();
//       expect(screen.getByText('Electric')).toBeInTheDocument();
//       expect(screen.getByText('HP:')).toBeInTheDocument();
//       expect(screen.getByText('300')).toBeInTheDocument();
//       expect(screen.getByRole('img', { name: 'Pikachu' })).toHaveAttribute('src', 'https://example.com/pikachu.png');
//     });
//   });

//   it('navigates to the correct page when the card is clicked', async () => {
//     render(
//       <MockedProvider mocks={mockQuerySuccess} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       const card = screen.getByRole('button'); 
//       act(() => {
//         card.click();
//       });
//       expect(mockRouterPush).toHaveBeenCalledWith('/?name=Pikachu');
//     });
//   });

//   it('renders placeholder image when pokemon.image is null or undefined', async () => {
//     const mockPokemonNoImage = { ...mockPokemon, image: null };
//     const mockQueryNoImage = [
//       {
//         request: {
//           query: expect.any(Object),
//           variables: { name: 'Pikachu' },
//         },
//         result: {
//           data: { pokemon: mockPokemonNoImage },
//         },
//       },
//     ];

//     render(
//       <MockedProvider mocks={mockQueryNoImage} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByRole('img', { name: 'Pikachu' })).toHaveAttribute('src', '/placeholder.svg');
//     });
//   });

//   it('renders multiple types correctly', async () => {
//     const mockPokemonMultiType = { ...mockPokemon, types: ['Grass', 'Poison'] };
//     const mockQueryMultiType = [
//       {
//         request: {
//           query: expect.any(Object),
//           variables: { name: 'Pikachu' },
//         },
//         result: {
//           data: { pokemon: mockPokemonMultiType },
//         },
//       },
//     ];

//     render(
//       <MockedProvider mocks={mockQueryMultiType} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Grass')).toBeInTheDocument();
//       expect(screen.getByText('Poison')).toBeInTheDocument();
//     });
//   });

//   it('renders HP bar with correct width', async () => {
//     render(
//       <MockedProvider mocks={mockQuerySuccess} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       const hpBarInner = screen.getByRole('progressbar');
//       expect(hpBarInner).toHaveStyle('width: 100%;');
//     });

//     const mockPokemonLowHP = { ...mockPokemon, maxHP: 50 };
//     const mockQueryLowHP = [
//       {
//         request: {
//           query: expect.any(Object),
//           variables: { name: 'Pikachu' },
//         },
//         result: {
//           data: { pokemon: mockPokemonLowHP },
//         },
//       },
//     ];

//     render(
//       <MockedProvider mocks={mockQueryLowHP} addTypename={false}>
//         <PokemonCard name="Pikachu" />
//       </MockedProvider>
//     );

//     await waitFor(() => {
//       const hpBarInner = screen.getByRole('progressbar');
//       expect(hpBarInner).toHaveStyle('width: 33.333333333333336%;'); 
//     });
//   });
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonById: builder.query({
      query: (id) => `pokemon/${id}`,
      keepUnusedDataFor: 0,
    }),
    getAllPokemon: builder.query({
      query: ({ limit, offset }) => `pokemon/?limit=${limit}&&offset=${offset}`,
      keepUnusedDataFor: 0,
    }),
    getPokemonColor: builder.query({
      query: (id) => `pokemon-species/${id}`,
      keepUnusedDataFor: 0,
    }),
    getPokemonType: builder.query({
      query: (id) => `type/${id}`,
      keepUnusedDataFor: 0,
    }),
    getPokemonSpecies: builder.query({
      query: (id) => `pokemon-species/${id}`,
      keepUnusedDataFor: 0,
    }),
    getPokemonEvolution: builder.query({
      query: (id) => `evolution-chain/${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetAllPokemonQuery,
  useGetPokemonByIdQuery,
  useGetPokemonColorQuery,
  useGetPokemonTypeQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonEvolutionQuery,
} = pokemonApi;

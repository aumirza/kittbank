import { SearchBoxCore, SessionToken } from '@mapbox/search-js-core';

import type {
  // biome-ignore lint/style/noExportedImports: <explanation>
  SearchBoxFeatureProperties,
  // biome-ignore lint/style/noExportedImports: <explanation>
  SearchBoxSuggestion,
} from '@mapbox/search-js-core/dist/searchbox/types';

export type { SearchBoxFeatureProperties, SearchBoxSuggestion };

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (!MAPBOX_TOKEN) {
  throw new Error('Mapbox token is not set');
}

export const search = new SearchBoxCore({ accessToken: MAPBOX_TOKEN });
export const sessionToken = new SessionToken();

export async function getAddressFromCoordinates(
  lat: number,
  lng: number
): Promise<SearchBoxFeatureProperties> {
  const results = await search.reverse([lng, lat]);
  if (results?.features && results.features.length > 0) {
    return results.features[0].properties;
  }
  throw new Error('No address found');
}
export async function retrieveMapboxSuggestion(
  place: SearchBoxSuggestion
): Promise<SearchBoxFeatureProperties> {
  const result = await search.retrieve(place, { sessionToken });
  if (result.features?.[0]) {
    return result.features[0].properties;
  }
  throw new Error('No address found');
}
export async function suggestMapbox(
  query: string,
  options: {
    limit?: number;
    types?: string;
    navigation_profile?: 'driving' | 'walking' | 'cycling';
    origin?: [number, number];
  } = {}
): Promise<SearchBoxSuggestion[]> {
  const res = await search.suggest(query, {
    limit: options.limit ?? 5,
    types:
      options.types ??
      'place,address,postcode,locality,neighborhood,street,block',
    sessionToken,
    navigation_profile: options.navigation_profile ?? 'driving',
    origin: options.origin,
  });
  return res.suggestions || [];
}

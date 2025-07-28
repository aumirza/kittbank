import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SearchBoxSuggestion } from '@/lib/mapbox';
import { suggestMapbox } from '@/lib/mapbox';
import { debounce } from '@/utils/debounce';

export const placeTypes = {
  city: ['place'],
  region: ['region'],
  address: ['address', 'street', 'locality', 'neighborhood'],
};

export function useMapboxSuggestions(
  query: string,
  {
    type,
  }: {
    type?: keyof typeof placeTypes;
  } = {}
) {
  const [suggestions, setSuggestions] = useState<SearchBoxSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to handle empty query
  const handleEmptyQuery = useCallback(() => {
    setSuggestions([]);
    setLoading(false);
    setError(null);
  }, []);

  // Helper to handle error
  const handleError = useCallback(
    (err: unknown, active: { current: boolean }) => {
      if (active.current) {
        const errorMessage =
          typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message?: unknown }).message)
            : 'Unknown error';
        setError(errorMessage);
        setSuggestions([]);
      }
    },
    []
  );

  // Helper to handle suggestions
  const handleSuggestions = useCallback(
    (
      suggestionsResult: SearchBoxSuggestion[],
      active: { current: boolean }
    ) => {
      if (active.current) {
        setSuggestions(suggestionsResult);
      }
    },
    []
  );

  // Debounced search function
  const debouncedSuggest = useMemo(
    () =>
      debounce(async (queryValue: string, active: { current: boolean }) => {
        if (!queryValue) {
          handleEmptyQuery();
          return;
        }
        setLoading(true);
        setError(null);
        try {
          const suggestionsResult = await suggestMapbox(queryValue, {
            limit: 5,
            navigation_profile: 'driving',
            types: placeTypes[type || 'address'].join(','),
          });
          handleSuggestions(suggestionsResult, active);
        } catch (err: unknown) {
          handleError(err, active);
        } finally {
          if (active.current) {
            setLoading(false);
          }
        }
      }, 350),
    [type, handleEmptyQuery, handleError, handleSuggestions]
  );

  useEffect(() => {
    const active = { current: true };
    debouncedSuggest(query, active);
    return () => {
      active.current = false;
      debouncedSuggest.cancel();
    };
  }, [query, debouncedSuggest]);

  return { suggestions, loading, error };
}

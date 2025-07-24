import { useCallback, useState } from "react";
import type {
  SearchBoxFeatureProperties,
  SearchBoxSuggestion,
} from "@/lib/mapbox";
import { retrieveMapboxSuggestion } from "@/lib/mapbox";

export function useRetrieveMapboxSuggestion() {
  const [retrieved, setRetrieved] = useState<SearchBoxFeatureProperties | null>(
    null,
  );
  const [retrieving, setRetrieving] = useState(false);
  const [retrieveError, setRetrieveError] = useState<string | null>(null);

  const retrieve = useCallback(async (place: SearchBoxSuggestion) => {
    setRetrieving(true);
    setRetrieveError(null);
    setRetrieved(null);
    try {
      const properties = await retrieveMapboxSuggestion(place);
      properties.full_address =
        properties.full_address ||
        `${properties.name}, ${properties.place_formatted}`;
      setRetrieved(properties);
      return properties;
    } catch (err: unknown) {
      setRetrieveError(err instanceof Error ? err.message : "Unknown error");
      setRetrieved(null);
    } finally {
      setRetrieving(false);
    }
  }, []);

  return { retrieved, retrieving, retrieveError, retrieve };
}

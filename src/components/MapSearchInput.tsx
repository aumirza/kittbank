import type { SearchBoxSuggestion } from '@mapbox/search-js-core';
import type { SearchBoxFeatureProperties } from '@mapbox/search-js-core/dist/searchbox/types';
import {
  type InputHTMLAttributes,
  type KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  type placeTypes,
  useMapboxSuggestions,
} from '@/hooks/useMapboxSuggestions';
import { useRetrieveMapboxSuggestion } from '@/hooks/useRetrieveMapboxSuggestion';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface MapSearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: SearchBoxFeatureProperties | null) => void;
  className?: string;
  render?: (
    inputProps: InputHTMLAttributes<HTMLInputElement>
  ) => React.ReactNode;
  type?: keyof typeof placeTypes;
}

export function MapSearchInput({
  value = '',
  placeholder,
  className,
  onChange,
  render,
  type,
}: MapSearchInputProps) {
  const [query, setQuery] = useState(value);
  // Sync query state with value prop
  useEffect(() => {
    setQuery(value);
  }, [value]);
  const [open, setOpen] = useState(false);
  const { suggestions, loading } = useMapboxSuggestions(query, { type });
  const { retrieve } = useRetrieveMapboxSuggestion();

  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);

  // Keyboard navigation
  useEffect(() => {
    if (!open) {
      setHighlightedIdx(-1);
    }
  }, [open]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIdx((idx) => (idx + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIdx(
        (idx) => (idx - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === 'Enter' && highlightedIdx >= 0) {
      e.preventDefault();
      const s = suggestions[highlightedIdx];
      handleSelect(s);
    }
  }

  const handleSelect = (address: SearchBoxSuggestion) => {
    if (type === 'city') {
      setQuery(address.name);
      setOpen(false);
      onChange?.(null);
    } else {
      setQuery(
        address.full_address || `${address.name} ${address.place_formatted}`
      ); // Set input to selected value
      setOpen(false);
      retrieve(address).then((retrieved) => {
        if (retrieved) {
          onChange?.(retrieved);
        }
      });
    }
  };

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    type: 'text',
    value: query,
    placeholder,
    onChange: (e) => setQuery(e.target.value),
    onKeyDown: handleKeyDown,
    'aria-autocomplete': 'list',
    'aria-controls': 'map-suggestion-list',
    'aria-expanded': open,
    autoComplete: 'off',
    role: 'combobox',
    onBlur: (e) => {
      // Only close if focus moves outside popover
      if (
        !(
          e.relatedTarget &&
          e.currentTarget.parentElement?.contains(e.relatedTarget as Node)
        )
      ) {
        setOpen(false);
      }
    },
  };

  return (
    <Popover modal={true} onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        {render ? (
          render(inputProps)
        ) : (
          <Input {...inputProps} className={cn(className)} />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        avoidCollisions={true}
        className="z-50 max-h-72 w-[var(--radix-popover-trigger-width)] overflow-auto rounded p-0"
        collisionPadding={8}
        id="map-suggestion-list"
        onBlur={(e) => {
          // Close popover if focus leaves popover content
          if (!(e.relatedTarget && e.currentTarget.contains(e.relatedTarget))) {
            setOpen(false);
          }
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        side="bottom"
        sideOffset={4}
        tabIndex={-1}
      >
        {(() => {
          if (loading) {
            return (
              <div className="p-4 text-center text-muted-foreground text-sm">
                Loading...
              </div>
            );
          }
          if (suggestions.length === 0) {
            return (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No results found
              </div>
            );
          }
          return (
            <ul className="w-full divide-y divide-border">
              {suggestions.map((s: SearchBoxSuggestion, idx: number) => (
                <li key={s.mapbox_id || idx}>
                  <button
                    className={cn(
                      'w-full cursor-pointer whitespace-normal break-words px-4 py-2 text-left text-sm transition-colors',
                      idx === highlightedIdx
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                    id={`option-${idx}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(s);
                    }}
                    onMouseEnter={() => setHighlightedIdx(idx)}
                    type="button"
                  >
                    {s.full_address || `${s.name}, ${s.place_formatted}`}
                  </button>
                </li>
              ))}
            </ul>
          );
        })()}
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useUserLocationStore } from '@/stores/userLocationStore';

function getGeolocationErrorMessage(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return 'The user denied the request for Geolocation.';
    case err.POSITION_UNAVAILABLE:
      return 'The location information is unavailable.';
    case err.TIMEOUT:
      return 'The request to get user location timed out.';
    default:
      return err.message?.trim()
        ? `An unknown error occurred: ${err.message}`
        : 'An unknown error occurred while retrieving location.';
  }
}

function runWithTimeout<T>(
  executor: (resolve: (value: T) => void) => void,
  onTimeout: () => T,
  timeoutMs = 5000
): Promise<T> {
  return new Promise((resolve) => {
    let resolved = false;
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(onTimeout());
      }
    }, timeoutMs);

    executor((value) => {
      if (!resolved) {
        clearTimeout(timeoutId);
        resolved = true;
        resolve(value);
      }
    });
  });
}

export function useUserLocation({ watch = false }: { watch?: boolean } = {}) {
  const {
    location,
    error,
    hasRehydrated,
    setLocation,
    setError,
    reset,
    // setWatchId, // uncomment if using watch
  } = useUserLocationStore();
  const watchIdRef = useRef<number | null>(null);

  const requestLocationPermission = useCallback(async (): Promise<
    'granted' | 'denied' | 'blocked'
  > => {
    if (!window.isSecureContext) {
      setError(
        'Geolocation only works in secure contexts (HTTPS or localhost).'
      );
      return 'blocked';
    }

    if (!navigator.geolocation) {
      setError('This browser does not support geolocation.');
      return 'blocked';
    }

    try {
      const permission = await navigator.permissions?.query?.({
        name: 'geolocation' as PermissionName,
      });
      if (permission?.state === 'denied') {
        setError(
          'Location permission is blocked. Enable it in browser settings.'
        );
        return 'blocked';
      }
    } catch {
      // fallback to prompt
    }

    return runWithTimeout<'granted' | 'denied' | 'blocked'>(
      (resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setError(null);
            resolve('granted');
          },
          (err) => {
            if (err.code === err.PERMISSION_DENIED) {
              setError(
                'Location permission is blocked. Enable it in browser settings.'
              );
              resolve('blocked');
            } else {
              setError(getGeolocationErrorMessage(err));
              resolve('denied');
            }
          },
          { timeout: 5000 }
        );
      },
      () => {
        setError(
          'Location timeout. Please ensure location services are enabled.'
        );
        return 'denied';
      }
    );
  }, [setLocation, setError]);

  useEffect(() => {
    if (
      !hasRehydrated ||
      location ||
      !navigator.geolocation ||
      !window.isSecureContext
    ) {
      if (!window.isSecureContext) {
        setError('Geolocation only works on secure (HTTPS) connections.');
      } else if (!navigator.geolocation) {
        setError('This browser does not support geolocation.');
      }
      return;
    }

    const fetchLocation = () =>
      runWithTimeout<void>(
        (resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLocation({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
              setError(null);
              resolve();
            },
            (err) => {
              setError(getGeolocationErrorMessage(err));
              resolve();
            },
            { timeout: 5000 }
          );
        },
        () => {
          setError(
            'Location timeout. Please ensure location services are enabled.'
          );
        }
      );

    navigator.permissions
      ?.query?.({ name: 'geolocation' as PermissionName })
      .then((result) => {
        if (result.state === 'denied') {
          setError(
            'Location permission is denied. Enable it in browser settings.'
          );
        } else {
          fetchLocation();
        }
      })
      .catch(() => {
        fetchLocation(); // fallback if permissions API not available
      });
  }, [hasRehydrated, location, setLocation, setError]);

  // Optional: watch user's location in background
  useEffect(() => {
    if (!(watch && navigator.geolocation)) {
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(getGeolocationErrorMessage(err));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10_000,
        timeout: 10_000,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [watch, setLocation, setError]);

  return {
    location,
    error,
    requestLocationPermission,
    reset,
  };
}

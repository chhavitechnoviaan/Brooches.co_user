import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LocationContext =
  createContext();

export const LocationProvider = ({
  children,
}) => {

  const [state, setState] =
    useState(
      localStorage.getItem(
        "userState"
      ) || ""
    );

  useEffect(() => {

    // ALREADY SAVED
    if (state) return;

    if (
      !navigator.geolocation
    ) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        try {

          const lat =
            position.coords
              .latitude;

          const lng =
            position.coords
              .longitude;

          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );

          const data =
            await response.json();

          const detectedState =
            data?.address
              ?.state || "";

          localStorage.setItem(
            "userState",
            detectedState
          );

          setState(
            detectedState
          );

        } catch (error) {

          console.log(error);

        }
      },
      (error) => {

        console.log(
          "Location denied",
          error
        );

      }
    );
  }, []);

  return (
    <LocationContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationData =
  () =>
    useContext(
      LocationContext
    );
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

export type Hotel = {
  name: string;
  city: string;
  country: string;
  address: string;
  chainId?: string;
  lat: number;
  lng: number;
  id: string;
  image?: string;
};
export type HotelChain = {
  id: string;
  name: string;
};

type Actions = {
  actions: {
    resetStore: () => void;
    addHotel: (data: Hotel) => void;
    updateHotel: (data: Hotel) => void;
    deleteHotel: (id: string) => void;
    addChain: (data: HotelChain) => void;
    updateChain: (data: HotelChain) => void;
    deleteChain: (id: string) => void;
    selectChain: (id: HotelChain["id"]) => void;
    toggleShowGrouped: () => void;
  };
};

type SelectedChainsType = {
  selectedChains: HotelChain["id"][];
};

type HotelState = {
  hotels: Hotel[];
};

type HotelChainState = {
  hotelChains: HotelChain[];
};

type ShowGrouped = {
  showGrouped: boolean;
};
export const useHotelStore = create<
  HotelState & HotelChainState & SelectedChainsType & ShowGrouped & Actions
>()(
  devtools(
    persist(
      immer((set) => ({
        hotels: [],
        hotelChains: [],
        selectedChains: [],
        showGrouped: false,
        actions: {
          addHotel: (data: Hotel) => {
            set((state) => {
              state.hotels.push(data);
            });
          },
          resetStore: () => {
            set((state) => {
              state.hotels = [];
            });
          },
          updateHotel: (data: Hotel) => {
            set((state) => {
              const index = state.hotels.findIndex(
                (hotel) => hotel.name === data.name
              );
              if (index !== -1) {
                state.hotels[index] = data;
              }
            });
          },
          deleteHotel: (id: string) => {
            set((state) => {
              state.hotels = state.hotels.filter((hotel) => hotel.id !== id);
            });
          },
          addChain: (data: HotelChain) => {
            set((state) => {
              state.hotelChains.push(data);
            });
          },
          updateChain: (data: HotelChain) => {
            set((state) => {
              const index = state.hotelChains.findIndex(
                (chain) => chain.id === data.id
              );
              if (index !== -1) {
                state.hotelChains[index] = data;
              }
              state.hotels = state.hotels.map((hotel) =>
                hotel.chainId === data.id
                  ? { ...hotel, chainId: undefined }
                  : hotel
              );
            });
          },
          deleteChain: (id: string) => {
            set((state) => {
              state.hotelChains = state.hotelChains.filter(
                (chain) => chain.id !== id
              );
              state.hotels = state.hotels.map((hotel) =>
                hotel.chainId === id ? { ...hotel, chainId: undefined } : hotel
              );
            });
          },
          selectChain: (id: HotelChain["id"]) => {
            set((state) => {
              if (state.selectedChains.includes(id)) {
                state.selectedChains = state.selectedChains.filter(
                  (chainId) => chainId !== id
                );
              } else {
                state.selectedChains.push(id);
              }
            });
          },
          toggleShowGrouped: () => {
            set((state) => {
              state.showGrouped = !state.showGrouped;
            });
          },
        },
      })),
      {
        name: "course-store",
        partialize: ({ hotels, hotelChains }) => ({
          hotels,
          hotelChains,
        }),
      }
    )
  )
);

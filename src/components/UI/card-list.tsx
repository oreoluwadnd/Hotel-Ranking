import HotelCard from "./hotel-card";
import Switch from "../common/switch";
import { Hotel, useHotelStore } from "../../../store/store";

export default function CardList() {
  const {
    hotels,
    hotelChains,
    showGrouped,
    selectedChains,
    actions: { toggleShowGrouped },
  } = useHotelStore();

  const handleChange = () => {
    toggleShowGrouped();
  };
  const getChainName = (chainId?: string) => {
    const chain = hotelChains.find((chain) => chain.id === chainId);
    return chain?.name;
  };
  const filteredHotels = selectedChains.length
    ? hotels.filter((hotel) => selectedChains.includes(hotel.chainId!))
    : hotels;
  const groupedHotels: { [chainId: string]: Hotel[] } | null = showGrouped
    ? filteredHotels.reduce(
        (acc: { [chainId: string]: Hotel[] }, hotel: Hotel) => {
          const chainId: string = hotel.chainId || "Independent";
          return {
            ...acc,
            [chainId]: [...(acc[chainId] || []), hotel],
          };
        },
        {}
      )
    : null;
  console.log(groupedHotels);
  return (
    <div className="px-4 lg:px-10 w-full gap-4 flex flex-col h-full">
      <div className=" w-full flex ">
        <div className=" w-full  items-center flex  justify-between">
          <h2 className="font-semibold">Favorite Hotels</h2>
          <div className="border gap-1 items-center rounded-lg flex p-2">
            <h3 className="">Group by Chain</h3>
            <Switch checked={showGrouped} onChange={handleChange} />
          </div>
        </div>
      </div>

      {showGrouped ? (
        <div>
          {Object.entries(groupedHotels as { [s: string]: Hotel[] }).map(
            ([chainId, chainHotels]: [string, Hotel[]]) => (
              <div key={chainId}>
                <h2 className="font-semibold my-2">{getChainName(chainId)}</h2>
                <div className="gap-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {chainHotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="gap-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}

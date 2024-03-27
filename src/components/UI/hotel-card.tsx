import { Hotel, useHotelStore } from "../../../store/store";
import { icons as icons } from "../common/icons";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const { hotelChains } = useHotelStore();
  const getChainName = (chainId: string) => {
    const chain = hotelChains.find((chain) => chain.id === chainId);
    return chain?.name;
  };
  return (
    <a
      href={`/details/${hotel.id}`}
      className="flex gap-1 flex-col cursor-pointer hover:shadow-lg p-3 rounded-lg"
    >
      <div className="relative w-full pb-[66.67%]">
        {hotel.image ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            className="absolute w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="absolute w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <icons.Hotel className="text-4xl text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex gap-0.5 flex-col mt-1">
        <div className="flex justify-between">
          <h3 className="font-semibold">{hotel.name}</h3>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {hotel.address}
        </p>
        <div className="flex items-center text-gray-500 gap-1">
          <icons.Collection />
          <p className="font-medium">
            {getChainName(hotel.chainId!) || "No Chain"}
          </p>
        </div>
        <div className="flex text-gray-500 gap-1">
          <icons.Location />
          <p className="text-sm ">{`${hotel.city} , ${hotel.country}`}</p>
        </div>
      </div>
    </a>
  );
}

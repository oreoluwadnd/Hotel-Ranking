import { useParams, useNavigate } from "react-router-dom";
import { icons as Icon } from "../common/icons";
import { useHotelStore } from "../../../store/store";
import { Button } from "../common/button";
import NewMapComponent from "./new-map";

export default function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    actions: { deleteHotel },
    hotels,
    hotelChains,
  } = useHotelStore();
  const hotel = hotels.find((hotel) => hotel.id === id);
  const getChainName = (chainId?: string) => {
    const chain = hotelChains.find((chain) => chain.id === chainId);
    return chain?.name;
  };
  const handleDelete = () => {
    if (hotel) {
      deleteHotel(hotel.id);
    }
    navigate("/");
  };

  return (
    <div className="h-full w-full p-3 md:px-10 overflow-hidden">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="p-1 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <a title="back" href="/">
                <Icon.ChevronLeft className="text-3xl" />
              </a>
            </Button>
            <Icon.Hotel className="text-2xl" />
            <h1 className="font-semibold text-2xl text-nowrap">Details</h1>
          </div>
          <div className="flex gap-2">
            <Button>
              <a href={`/new/${hotel?.id}`}>Edit</a>
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          This is the hotel details page
        </p>
        <div className="flex flex-col gap-4 border border-1 my-3 shadow-lg p-2 lg:px-44 lg:py-10 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hotel?.image ? (
              <img
                src={hotel?.image}
                alt={hotel?.name}
                width={50}
                height={50}
                className="rounded-md aspect-square w-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 rounded-md aspect-square w-full object-cover flex items-center justify-center">
                <Icon.Hotel className="text-4xl text-gray-400" />
              </div>
            )}
            <div className="space-y-2  h-full">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {hotel?.name}
              </h1>
              <div className="gap-1 flex">
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-500 text-white uppercase rounded-full">
                  {getChainName(hotel?.chainId) || "No Chain"}
                </span>
              </div>
              <p className="text-clip text-wrap">{hotel?.address}</p>

              <div className="flex text-gray-500 gap-1">
                <Icon.Location />
                <p className="text-sm ">{`${hotel?.city} , ${hotel?.country}`}</p>
              </div>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex flex-col  text-black">
            <NewMapComponent lat={hotel?.lat || 0} lng={hotel?.lng || 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

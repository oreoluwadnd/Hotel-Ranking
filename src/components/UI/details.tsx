import { useParams, useNavigate } from "react-router-dom";
import { icons } from "../common/icons";
import { useHotelStore } from "../../../store/store";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button } from "../common/button";

export type hotelForm = {
  name: string;
  city: string;
  country: string;
  address: string;
  chainId: string;
  lat: number;
  lng: number;
  image: string;
};

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
    <div className="h-full w-full p-1 md:px-10 overflow-hidden">
      <main className="grid items-start gap-4 p-2  md:gap-8 md:pb-20 md:p-6">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <icons.Hotel className="text-2xl" />
              <h1 className="font-semibold text-2xl text-nowrap">
                Hotel Details
              </h1>
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
              <img
                src="https://a0.muscache.com/im/pictures/585f1bf7-e6fe-491f-a9ba-774d2758edeb.jpg?im_w=720"
                alt={`course image`}
                width={50}
                height={50}
                className="rounded-md aspect-square w-full object-cover"
              />
              <div className="space-y-2  h-full">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {hotel?.name}
                </h1>
                <div className="gap-1 flex">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-500 text-white uppercase rounded-full">
                    {getChainName(hotel?.chainId)}
                  </span>
                </div>
                <p className="text-clip text-wrap">{hotel?.address}</p>

                <div className="flex text-gray-500 gap-1">
                  <icons.Location />
                  <p className="text-sm ">{`${hotel?.city} , ${hotel?.country}`}</p>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-col  text-black">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup> {hotel?.image}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
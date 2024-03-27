import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/common/carousel";

import { useHotelStore } from "../../../store/store";
import { cn } from "../../utils/utils";

export default function ChainCarousel() {
  const {
    hotelChains,
    selectedChains,
    actions: { selectChain },
  } = useHotelStore();
  const handleSelect = (id: string) => {
    selectChain(id);
  };
  const isSelected = (id: string) => selectedChains.includes(id);

  return (
    <section className="w-full p-4 bg-white">
      <Carousel
        opts={{
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1 flex gap-1">
          {hotelChains.map((chain) => (
            <CarouselItem
              key={chain.id}
              onClick={() => handleSelect(chain.id)}
              className={cn(
                "basis-auto flex items-center flex-col cursor-pointer justify-center rounded-2xl px-2 border hover:shadow-2xl  hover:bg-gray-200 transition-all",
                isSelected(chain.id) && "bg-[#E63E21] text-white"
              )}
            >
              <p className="whitespace-nowrap">{chain.name}</p>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-white text-black hover:text-white hover:bg-black" />
        <CarouselNext className="bg-white text-black hover:text-white hover:bg-black" />
      </Carousel>
    </section>
  );
}

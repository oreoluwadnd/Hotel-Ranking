import { icons as Icon, icons } from "./common/icons";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormInput,
} from "@/components/common/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./common/button";
import { FaFacebook } from "react-icons/fa";

import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./common/alert-dialogue";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./common/carousel";
import { useState } from "react";
import { cn } from "@/utils/utils";
import FacebookAutocompleteInput from "./faceAutoComplete";
import FaceBookNewMapComponent from "./facebookMap";

const formSchema = z.object({
  location: z.string().min(1, {
    message: "Name is required",
  }),
  radius: z.number(),
  lat: z.number(),
  lng: z.number(),
});

interface Group {
  link: string;
  description: string;
  myCity: string;
  name: string;
  details: string;
  summary: string;
}
interface GroupData {
  [index: number]: {
    link: string;
    description: string;
    myCity: string;
    name: string;
    details: string;
    summary: string;
  };
}

export default function FacebookForm() {
  const [data, setData] = useState<GroupData[] | null>();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      lat: 0,
      lng: 0,
      radius: 10,
    },
  });
  function mergeData(data: GroupData[]): Group[] {
    if (!data) {
      return [];
    }
    const mergedData: Group[] = [];

    data.forEach((groupSet) => {
      Object.values(groupSet).forEach((group: Group) => {
        mergedData.push(group);
      });
    });

    return mergedData;
  }

  const filteredWords = [
    "buy",
    "sell",
    "business",
    "market",
    "job",
    "contractor",
    "job",
    "finder",
    "help",
    "wanted",
    "adopt",
    "shop",
    "garage",
    "sale",
    "handyman",
    "work",
    "from",
    "home",
    "job",
    "postings",
    "real",
    "estate",
    "agents",
  ];
  function getMembers(detailsString: string) {
    const parts = detailsString.split(" · ");
    const membersString = parts[1];
    const membersMatch = membersString.match(/\d+/); // Extract only the digits from the string

    if (membersMatch) {
      const membersCount = parseInt(membersMatch[0]); // Parse the matched digits
      if (membersString.includes("k")) {
        return membersCount * 1000;
      } else {
        return membersCount;
      }
    }
    return null; // Return null if no members count found
  }
  function getVisibility(detailsString: string) {
    return detailsString.includes("public") ? "Public" : "Private";
  }

  // Filter the data to include only groups with at least 1000 members, whose name contains "buy selling", and are private
  const filteredData = mergeData(data as GroupData[]).filter((item) => {
    const details = item.details.toLowerCase(); // Assuming details is a string
    const name = item.name.toLowerCase();
    const memberCount = getMembers(details) || 0;

    // Check if any filtered word is included in the name
    const containsFilteredWord = filteredWords.some((word) =>
      name.includes(word)
    );

    // Check if the conditions are met
    return (
      memberCount >= 1000 &&
      !containsFilteredWord &&
      !details.includes("public")
    );
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Handle successful submission, e.g., show a success message

    setData([]);
    setCities([]);
    setLoading(true);
    console.log("response", values);
    try {
      const response = await axios.post("http://localhost:8000/ai", values);

      const data = response.data.response;

      setData(data.scrapeJson);
      setCities(data.cities);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);

      setLoading(false);
      return;
    }
  };
  return (
    <div className="h-full w-full p-1 md:px-10 border-2">
      <main className="grid items-start gap-4 p-2  md:gap-8 md:pb-5 md:p-6">
        <div className="flex flex-col">
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
            <h1 className="font-semibold text-2xl text-nowrap">
              Search For Groups
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Please provide the location you'd like to search for groups.
          </p>
        </div>

        <div>
          <Form {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6"
            >
              <div className="col-span-1 md:col-span-2">
                <FormLabel>Select Location</FormLabel>
                <div>
                  <FaceBookNewMapComponent
                    setValue={form.setValue}
                    lng={form.watch("lng")}
                    lat={form.watch("lat")}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Location</FormLabel>
                    <FacebookAutocompleteInput
                      field={field}
                      setValue={form.setValue}
                      lng={form.getValues("lng")}
                      lat={form.getValues("lat")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="radius"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Radius</FormLabel>
                    <FormInput placeholder="e.g 20 , 30 etc" {...field} />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full md:col-span-2 justify-center">
                <Button className="w-full md:w-fit" type="submit">
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      <div className="px-4 lg:px-10 w-full gap-4 flex flex-col h-full">
        <div className=" w-full flex flex-col">
          <div className=" w-full  items-center flex  justify-between">
            <h2 className="font-semibold">Groups</h2>
          </div>
          <section className="w-full p-4 bg-white">
            <Carousel
              opts={{
                dragFree: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-1 flex gap-1">
                {cities.map((city) => (
                  <CarouselItem
                    key={city}
                    className={cn(
                      "basis-auto flex items-center flex-col cursor-pointer justify-center rounded-2xl px-2 border hover:shadow-2xl  hover:bg-gray-200 transition-all"
                    )}
                  >
                    <p className="whitespace-nowrap">{city}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="bg-white text-black hover:text-white hover:bg-black" />
              <CarouselNext className="bg-white text-black hover:text-white hover:bg-black" />
            </Carousel>
          </section>
          <div className="grid grid-cols-4 gap-3">
            {filteredData.map((group) => (
              <div className="flex flex-1 gap-1 flex-col cursor-pointer hover:shadow-lg p-3 rounded-lg">
                <div className="relative w-full pb-[66.67%]">
                  <div className="absolute w-full h-full bg-black rounded-lg flex items-center justify-center">
                    <FaFacebook className="text-4xl text-blue-800" />
                  </div>
                </div>
                <div className="flex gap-0.5 flex-col mt-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {group.name.toLocaleUpperCase()}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {/* {group.summary} */}
                  </p>
                  <div className="flex items-center text-gray-500 gap-1">
                    <icons.Collection />
                    <p className="font-medium">
                      {getMembers(group.details)} members
                    </p>
                  </div>
                  <div className="flex items-center text-gray-500 gap-1">
                    <icons.Circle />
                    <p className="font-medium">
                      {getVisibility(group.details)}
                    </p>
                  </div>
                  <div className="flex text-gray-500 gap-1">
                    <icons.Location />
                    <p className="text-sm ">{group.myCity}</p>
                  </div>
                </div>
                <div className="grid my-auto bottom-0 gap-2 grid-cols-">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={group.link}
                    className="w-full"
                  >
                    <Button className="w-full">Link</Button>
                  </a>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="default">Details</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="h-80 overflow-y-scroll">
                            {group.summary}
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

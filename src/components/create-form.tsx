import { icons as Icon } from "./common/icons";
import {
  Form,
  FormItem,
  FormLabel,
  FormInput,
  FormMessage,
  FormField,
} from "@/components/common/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./common/button";
import ChainForm from "./chain-form";
import { useHotelStore } from "../../store/store";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NewMapComponent from "./UI/new-map";
import AutocompleteInput from "./UI/autocomplete-input";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  chainId: z.string().optional(),
  id: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  image: z.string().optional(),
});

export default function CreateForm() {
  const navigate = useNavigate();
  const {
    actions: { addHotel, updateHotel },
    hotels,
  } = useHotelStore();

  const { id } = useParams();
  console.log(id);
  const hotel = hotels.find((hotel) => hotel.id === id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: hotel?.id || "",
      name: hotel?.name || "",
      city: hotel?.city || "",
      country: hotel?.country || "",
      address: hotel?.address || "",
      chainId: hotel?.chainId ?? undefined,
      lat: hotel?.lat || 0,
      lng: hotel?.lng || 0,
      image: hotel?.image ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (id) {
      updateHotel({ ...values, id });
    }
    if (!id) {
      const newId = uuidv4();
      addHotel({ ...values, id: newId });
    }
    toast.success(`Hotel ${id ? "updated" : "created"} successfully`);
    form.reset();
    if (id) {
      return navigate(`/details/${id}`);
    }
    return navigate("/");
  };
  return (
    <div className="h-full w-full p-1 md:px-10 border-2 overflow-hidden">
      <main className="grid items-start gap-4 p-2  md:gap-8 md:pb-20 md:p-6">
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
              {id ? "Edit Hotel" : "Create Hotel"}
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Please provide the specific preferences or criteria you'd like to
            include for the hotels.
          </p>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Name*</FormLabel>
                    <FormInput placeholder="e.g Big Pineapple" {...field} />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chainId"
                render={({ field }) => <ChainForm field={field} />}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Image</FormLabel>
                    <FormInput
                      placeholder="e.g https://th.bing.com/th/id/"
                      type="text"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>City*</FormLabel>
                    <FormInput
                      placeholder="e.g Paris, London, Abuja"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Country*</FormLabel>
                    <FormInput
                      placeholder="e.g Isreal, France, Canada"
                      {...field}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Address*</FormLabel>
                    <AutocompleteInput
                      field={field}
                      key={hotel?.id}
                      setValue={form.setValue}
                      lng={form.getValues("lng")}
                      lat={form.getValues("lat")}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-1 md:col-span-2">
                <FormLabel>Select Location</FormLabel>
                <div>
                  <NewMapComponent
                    key={hotel?.id}
                    setValue={form.setValue}
                    lng={form.watch("lng")}
                    lat={form.watch("lat")}
                  />
                </div>
              </div>
              <div className="w-full md:col-span-2 justify-center">
                <Button className="w-full md:w-fit" type="submit">
                  {id ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}

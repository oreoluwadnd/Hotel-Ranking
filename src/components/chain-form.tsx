import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./common/dialogue";
import { Button } from "./common/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./common/select";
import {
  FormItem,
  FormLabel,
  FormInput,
  FormMessage,
  FormControl,
} from "@/components/common/form";
import { v4 as uuidv4 } from "uuid";
import { icons as Icon } from "./common/icons";
import { ControllerRenderProps } from "react-hook-form";
import { useCallback, useState } from "react";
import { Hotel, HotelChain, useHotelStore } from "../../store/store";

type ChainFormProps = {
  field: ControllerRenderProps<Hotel, "chainId">;
};

export default function ChainForm({ field }: ChainFormProps) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [chainUpdate, setChainUpdate] = useState<HotelChain | undefined>();
  const {
    actions: { addChain, updateChain, deleteChain },
    hotelChains,
  } = useHotelStore();

  const handleDialogue = (data?: HotelChain) => {
    if (data) {
      setChainUpdate(data);
    } else {
      setChainUpdate(undefined);
    }
    setOpen(!open);
    setName("");
  };
  const onSubmit = () => {
    if (chainUpdate) {
      updateChain({ id: chainUpdate.id, name: name });
    } else {
      addChain({
        id: uuidv4(),
        name: name,
      });
    }
    handleDialogue();
  };
  const handleDeleteChain = (chainId: string) => {
    if (chainUpdate) {
      deleteChain(chainId);
    }
    handleDialogue();
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);
  return (
    <>
      <FormItem>
        <FormLabel>Chain</FormLabel>
        <FormControl>
          <Select
            value={field.value ? field.value.toString() : ""}
            onValueChange={(val) => {
              field.onChange(val);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select / Create a chain" />
            </SelectTrigger>

            <SelectContent className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleDialogue();
                }}
                className="flex items-center gap-2 p-2 w-full hover:shadow-md border-2 cursor-pointer"
              >
                <Icon.New />
                <p>Create</p>
              </Button>
              {!hotelChains.length && (
                <p className="text-center py-3">No chain available</p>
              )}
              {hotelChains.map((chain) => (
                <div key={chain.id} className="flex gap-1 my-1">
                  <SelectItem
                    className="w-full border-3"
                    key={chain.id}
                    value={chain.id.toString()}
                  >
                    <div className="flex">
                      <p>{chain.name}</p>
                    </div>
                  </SelectItem>
                  <Button
                    onClick={() => {
                      handleDialogue(chain);
                    }}
                    variant="secondary"
                  >
                    <Icon.Pencil className="mr-auto" />
                  </Button>
                </div>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTrigger>
            <div
              onClick={() => {
                handleDialogue();
              }}
              className="absolute top-0 right-0 m-4"
            >
              <Icon.Times className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </div>
          </DialogTrigger>

          <DialogHeader>
            <DialogTitle>Edit chain</DialogTitle>
            <DialogDescription>
              Make changes to your chain here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <FormItem className="flex flex-col">
              <FormLabel>Name</FormLabel>
              <FormInput
                placeholder="e.g Big Pineapple"
                onChange={handleChange}
                defaultValue={chainUpdate?.name || name}
              />
              <FormMessage />
            </FormItem>
          </div>
          <DialogFooter className="flex gap-1">
            {chainUpdate && (
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteChain(chainUpdate.id);
                }}
              >
                Delete
              </Button>
            )}
            <Button onClick={onSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

import { Button } from "../common/button";

export default function NoResult() {
  return (
    <div className="h-96 gap-1 flex-col  items-center justify-center flex">
      <h1 className="font-extralight  text-2xl text-nowrap">
        It's empty in here
      </h1>
      <p className="text-center">Get started by creating hotels.</p>
      <Button>
        <a href="/new">Create</a>
      </Button>
    </div>
  );
}

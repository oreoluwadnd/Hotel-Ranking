import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { icons as Icon } from "./icons";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onChange, ...props }, forwardRef) => (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        onChange={onChange}
        ref={forwardRef}
        {...props}
      />
      <div
        className={`w-10 p-0.5 rounded-full ${
          /* Reduced width to w-10 and padding to p-0.5 */
          checked ? "bg-black" : "bg-gray-200"
        }`}
      >
        <div
          className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${
            checked ? "bg-white translate-x-4" : "bg-gray-400 -rotate-180"
          }`}
        >
          {checked ? (
            <Icon.Link size={16} color="black" />
          ) : (
            <Icon.Unlink size={16} color="white" />
          )}
        </div>
      </div>
    </label>
  )
);

export default Switch;

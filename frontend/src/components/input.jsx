import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ icon: Icon, isValid, ...props }) => {
  const [obscure, setObscure] = useState(true);

  const { type: inputType, value } = props;
  const isPassword = inputType === "password";
  const type = isPassword ? (obscure ? "password" : "text") : inputType;

  const EyeIcon = obscure ? EyeOff : Eye;

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex-center pl-3 pointer-events-none">
        <Icon className="size-5 text-primary" />
      </div>
      <input
        {...props}
        type={type}
        className={`w-full pl-10 py-2 bg-secondary/50 rounded-lg border  outline-hidden
        placeholder-foreground/40 transition disabled:bg-secondary/25 disabled:border-secondary/50 
        disabled:text-foreground/50 disabled:pointer-events-none flex-end
        ${
          value.length > 0
            ? isValid
              ? "border-green-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              : "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-secondary focus:border-primary/20 focus:ring-2 focus:ring-primary"
        }
        ${isPassword && "pr-10"}`}
      />
      {isPassword && (
        <button
          onClick={() => setObscure(!obscure)}
          className="absolute inset-y-0 right-0 flex-center pr-3 pl-1.5 cursor-pointer"
          type="button"
        >
          <EyeIcon className="size-5 text-primary" />
        </button>
      )}
    </div>
  );
};

export { Input };

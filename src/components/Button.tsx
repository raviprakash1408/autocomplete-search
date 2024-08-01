interface ButtonProps {
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
  }
  
  export function Button({ type, disabled, onClick, children }: ButtonProps) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="px-4 py-2 my-4 bg-gray-700 flex-shrink-0 text-white rounded-md hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed cursor-pointer"
      >
        {children}
      </button>
    );
  }
  
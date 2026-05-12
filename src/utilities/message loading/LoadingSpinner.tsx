import loaderImage from "../../assets/loader.png";

type LoadingSpinnerSize = "sm" | "md" | "lg";

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  text?: string;
}

function LoadingSpinner({
  size = "md",
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses: Record<LoadingSpinnerSize, string> = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={loaderImage}
        alt="Loading..."
        className={`${sizeClasses[size]} animate-spin mb-2`}
      />
      <p className="text-gray-600 font-medium text-sm">{text}</p>
    </div>
  );
}

export default LoadingSpinner;

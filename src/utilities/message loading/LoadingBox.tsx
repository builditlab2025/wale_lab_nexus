// src/components/common/loading/LoadingBox.tsx
import loaderImage from "../../assets/logo.svg";

function LoadingBox() {
  return (
    <div
      data-cy="loading-box"
      className="fixed inset-0 flex justify-center items-center min-h-screen bg-white z-[100]"
    >
      {/* Minimal geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(#00B140_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      {/* Soft gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-50 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full filter blur-3xl opacity-70"></div>

      <div className="relative flex flex-col items-center">
        {/* Clean loader design */}
        <div className="relative mb-10">
          {/* Simple rotating circle - fixed border width */}
          <div className="w-20 h-20 rounded-full border-4 border-primary-100 border-t-primary-500 animate-spin"></div>

          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={loaderImage}
              alt="Wale Lab"
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-medium text-gray-900">Wale Lab</h2>

          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-400 text-sm">Loading</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></div>
            </div>
          </div>

          <p className="text-gray-400 text-xs">Innovation in progress</p>
        </div>

        {/* Simple progress indicator */}
        <div className="mt-8 w-40 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full animate-loading"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingBox;
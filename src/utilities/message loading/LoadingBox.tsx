import logo from "../../assets/logo.png";

function LoadingBox() {
  return (
    <div
      data-cy="loading-box"
      className="fixed inset-0 flex justify-center items-center min-h-screen bg-slate-50 z-[100]"
    >
      {/* Wale Lab Logo Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%2300a708' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Brand gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00a708]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f8921e]/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#02250a]/5 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col items-center">
        {/* Loader design with brand colors */}
        <div className="relative mb-8">
          {/* Rotating circle with brand green */}
          <div className="w-20 h-20 rounded-full border-4 border-[#00a708]/20 border-t-[#00a708] animate-spin"></div>

          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={logo}
                alt="Wale Lab Nexus Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Loading text with brand */}
        <div className="text-center space-y-3">
          <div>
            <h2 className="text-xl font-extrabold tracking-tighter text-[#02250a]">
              WALE LAB <span className="text-[#00a708]">NEXUS</span>
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#f8921e] font-bold mt-1">
              Manifold Wisdom
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <span className="text-slate-500 text-sm font-medium">Loading</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#00a708] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-[#00a708] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-[#00a708] rounded-full animate-bounce"></div>
            </div>
          </div>

          <p className="text-slate-400 text-2xs font-bold uppercase tracking-widest">
            Public Evidence Layer
          </p>
        </div>

        {/* Progress indicator with brand colors */}
        <div className="mt-8 w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00a708] to-[#f8921e] rounded-full animate-loading"></div>
        </div>

        {/* Subtle status message */}
        <div className="mt-6">
          <p className="text-3xs text-slate-400 font-mono">
            v2.4 • Institutional Asset
          </p>
        </div>
      </div>

      {/* Add custom animation for loading bar if not already in global CSS */}
      <style>{`
        @keyframes loading {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
        .animate-loading {
          animation: loading 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LoadingBox;

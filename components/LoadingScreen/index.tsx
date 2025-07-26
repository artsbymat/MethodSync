const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;

export function Hero() {
  return (
    <div className="pattern-bg flex min-h-[35vh] flex-col justify-center py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span>Cryptic </span>
            <span className="text-indigo-600 dark:text-indigo-300">on paper</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Encrypt messages with simple ciphers that you could replicate on a piece of
            paper
          </p>
        </div>
      </div>
    </div>
  );
}

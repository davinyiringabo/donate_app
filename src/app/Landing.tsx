const LandingPage = () => {
  return (
    <div className="h-full flex flex-col min-h-screen px-6 py-8 mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Help Those In Need</h1>
        <p className="text-xl text-center text-gray-700">
          Make a difference with a donation today.
        </p>
      </header>

      <main className="flex flex-col gap-8">
        <section className="flex flex-col items-center">
          <p className="text-lg text-center mt-4">
            Your donation can provide critical support to those facing hardship.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Choose Your Cause</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
              Education
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700">
              Healthcare
            </button>
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700">
              Environment
            </button>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700">
              Disaster Relief
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

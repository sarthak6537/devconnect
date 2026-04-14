function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        🚀 Welcome to DevConnect
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Find developers or post your project easily
      </p>

      <div className="flex gap-4">
        <a href="/projects" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Browse Projects
        </a>

        <a href="/post" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          Post Project
        </a>
      </div>

    </div>
  );
}

export default Home;
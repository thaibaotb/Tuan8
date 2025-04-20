export default function Header() {
  return (
    <>
      <h1 className="text-pink-400 mr-170 font-bold">Dashboard</h1>
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 rounded-2xl h-10 pl-10 w-full"
        />
        <img
          src="src/assets/img/Search.png"
          alt="search"
          className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      <span>
        <img src="src/assets/img/Bell 1.png" alt="" />
      </span>
      <span>
        <img src="src/assets/img/Question 1.png" alt="" />
      </span>
      <span>
        <img src="src/assets/img/Avatar 313.png" alt="" />
      </span>
    </>
  );
}

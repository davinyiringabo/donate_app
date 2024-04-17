import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white">
      <svg
        className="w-48 h-48 mb-8 animate-spin"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 10 L90 10 L90 90 L10 90 L10 10 L20 20 L80 20 L80 80 Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M80 50 L90 60 L70 60 Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20 50v10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h1 className="text-3xl font-bold mb-4">Houston, We Have a Problem!</h1>
      <p className="text-xl mb-8">
        The page you requested seems lost in space (or maybe it never existed!).
        Don't worry, we'll help you find your way back.
      </p>
      <div className="flex gap-4">
        <NavLink
          to="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Take me Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;

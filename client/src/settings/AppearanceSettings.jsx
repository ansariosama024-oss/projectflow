import { useState } from "react";
import toast from "react-hot-toast";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");

  const handleTheme = (selectedTheme) => {
    setTheme(selectedTheme);

    document.documentElement.classList.toggle(
      "dark",
      selectedTheme === "dark"
    );

    localStorage.setItem("theme", selectedTheme);

    toast.success("Theme updated");
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900">
      <h2 className="mb-6 text-xl font-semibold">
        Appearance
      </h2>

      <div className="space-y-4">

        <label className="flex items-center justify-between rounded-lg border p-4">

          <span className="font-medium">
            Light Mode
          </span>

          <input
            type="radio"
            checked={theme === "light"}
            onChange={() => handleTheme("light")}
          />

        </label>

        <label className="flex items-center justify-between rounded-lg border p-4">

          <span className="font-medium">
            Dark Mode
          </span>

          <input
            type="radio"
            checked={theme === "dark"}
            onChange={() => handleTheme("dark")}
          />

        </label>

      </div>

    </div>
  );
};

export default AppearanceSettings;
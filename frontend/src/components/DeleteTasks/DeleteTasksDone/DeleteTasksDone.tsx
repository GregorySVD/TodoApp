import { useEffect } from "react";
import "./DeleteTasksDone.css";
import { useTaskListRerenderContext } from "../../../context/TaskListRerenderContext";
import { useErrorContext } from "../../../context/ErrorContext";
import { ErrorPage } from "../../pages/ErrorPage/ErrorPage";
import { toast } from "sonner";
import { useTheme } from "../../../context/ThemeContext";
import { BACKEND_URL_POSTGRES } from "src/utils/backend_URL";

export const ClearTasksDone = () => {
  const { darkTheme } = useTheme();

  const { setShouldRerender } = useTaskListRerenderContext();
  const { error, setError } = useErrorContext();

  useEffect(() => {
    const appRoot = document.querySelector(".ClearTaskDone__btn");
    if (appRoot) {
      appRoot.classList.toggle("dark-theme", darkTheme);
    }
  }, [darkTheme]);

  const handleClearTasksDone = async (): Promise<void> => {
    try {
      const res = await fetch(`${BACKEND_URL_POSTGRES}done`, {
        method: "DELETE",
      });
      if (!res.ok) {
        await setError(new Error(`There was an error during clearing tasks done. Try again later.`));
        await toast.error(`There was an error during clearing tasks done.`);
      } else {
        toast.success(`Clearing tasks done successfully! Keep it up!`);
        setShouldRerender(true);
      }
    } catch (err) {
      await setError(new Error(`There was an error during clearing tasks done. Try again later.`));
      await toast.error(`There was an error during clearing tasks done.`);
    }
  };
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="ClearTaskDone__container">
      <button className="ClearTaskDone__btn" onClick={handleClearTasksDone}>
        Clear Tasks Done
      </button>
    </div>
  );
};

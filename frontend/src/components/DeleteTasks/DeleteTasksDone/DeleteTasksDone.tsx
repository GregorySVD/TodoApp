import { useEffect, useState } from "react";
import "./DeleteTasksDone.css";
import { useTaskListRerenderContext } from "../../../context/TaskListRerenderContext";
import { useErrorContext } from "../../../context/ErrorContext";
import { ErrorPage } from "../../pages/ErrorPage/ErrorPage";
import { toast } from "sonner";
import { useTheme } from "../../../context/ThemeContext";
import { BACKEND_URL_POSTGRES } from "src/utils/backend_URL";
import { Loader } from "src/components/common/Loader/Loader";

export const ClearTasksDone = () => {
  const { darkTheme } = useTheme();

  const { setShouldRerender } = useTaskListRerenderContext();
  const { error, setError } = useErrorContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const appRoot = document.querySelector(".ClearTaskDone__btn");
    if (appRoot) {
      appRoot.classList.toggle("dark-theme", darkTheme);
    }
  }, [darkTheme]);

  const handleClearTasksDone = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL_POSTGRES}done`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError(new Error(`There was an error during clearing tasks done. Try again later.`));
        toast.error(`There was an error during clearing tasks done.`);
      } else {
        toast.success(`Clearing tasks done successfully! Keep it up!`);
        setShouldRerender(true);
        setLoading(false);
      }
    } catch (err) {
      setError(new Error(`There was an error during clearing tasks done. Try again later.`));
      toast.error(`There was an error during clearing tasks done.`);
    }
  };
  if (error) return <ErrorPage error={error} />;
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="ClearTaskDone__container">
      <button className="ClearTaskDone__btn" onClick={handleClearTasksDone}>
        Clear Tasks Done
      </button>
    </div>
  );
};

import Axios from "axios";
import { useEffect, useState } from "react";
import store from "../../store";

const ManageIndex = () => {
  const [surveys, setSurveys] = useState<any[]>([]);
  useEffect(() => {
    const f = async () => {
      const res = await Axios.get("http://localhost:3000/v1/surveys", {
        headers: {
          Authorization: `Bearer ${store.getState().auth.accessToken}`,
        },
      });
      setSurveys(res.data.surveys);
      console.log(res);
    };
    f();
  }, []);

  return (
    <div>
      <div>ManageIndex</div>
      <code>{JSON.stringify(surveys, null, 2)}</code>
    </div>
  );
};

export default ManageIndex;

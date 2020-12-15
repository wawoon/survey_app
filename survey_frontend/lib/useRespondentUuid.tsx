import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../store";
import { setUuid } from "../lib/slices/auth_slice";

export const useRespondentUuid = () => {
  const dispatch = useDispatch();
  const uuid = useSelector((state: ReduxStore) => state.auth.respondentUuid);
  const setRespondentUuid = (uuid: string) => {
    dispatch(setUuid({ respondentUuid: uuid }));
  };

  return [uuid, setRespondentUuid];
};

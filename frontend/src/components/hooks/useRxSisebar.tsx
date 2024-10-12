import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useRxSisebar = () => {
  const actions = useSelector((state: RootState) => state.sidebar);
  return actions;
};

export default useRxSisebar;

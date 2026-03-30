import type React from "react";
import { useParams } from "react-router-dom";

const Room: React.FC = () => {
  const { id } = useParams();
  return <div>room is : {id}</div>;
};
export default Room;

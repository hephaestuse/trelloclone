import { useParams } from "react-router-dom";

function Boardpage() {
  const { boardId } = useParams();
  return (
    <>
      <div>{boardId}</div>
      <div>board page</div>
      <div>board page</div>
      <div>board page</div>
      <div>board page</div>
      <div>board page</div>
      <div>board page</div>
      <div>board page</div>;
    </>
  );
}

export default Boardpage;

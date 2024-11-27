import StudentsTable from "./StudentTable"
import AddStudent from "./AddStudent";
import DeleteStudent from "./DeleteStudent";
import UpdateStudent from "./UpdateStudent";
import { useState } from "react";

function App() {

  const [someChange, setSomeChange] = useState(0)

  return (
    <>
      <StudentsTable someChange={someChange} />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <AddStudent onChange={setSomeChange} />
        <DeleteStudent onChange={setSomeChange} />
        <UpdateStudent onChange={setSomeChange} />
      </div>
    </>
  );
}

export default App;

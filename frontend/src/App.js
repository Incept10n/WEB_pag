import StudentsTable from "./StudentTable"
import AddStudent from "./AddStudent";
import DeleteStudent from "./DeleteStudent";
import { useState } from "react";

function App() {

  const [someChange, setSomeChange] = useState(0)

  return (
    <>
      <StudentsTable someChange={someChange} />
      <div style={{ display: "flex", gap: "10px" }}>
        <AddStudent onChange={setSomeChange} someChange={someChange} />
        <DeleteStudent onChange={setSomeChange} />
      </div>
      {/* <AddStudent onChange={setSomeChange} />
      <DeleteStudent onChange={setSomeChange} /> */}
    </>
  );
}

export default App;

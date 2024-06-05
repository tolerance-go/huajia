import { useState } from "react";
import Editor from "./components/Editor";
import { Renderer } from "./components/Renderer";

const App = () => {
  const [dslCode, setDslCode] = useState("");

  const handleEditorChange = (newCode: string) => {
    setDslCode(newCode);
  };

  return (
    <div style={{ display: "flex" }}>
      <Editor onChange={handleEditorChange} />
      <Renderer dslCode={dslCode} />
    </div>
  );
};

export default App;

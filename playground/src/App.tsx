import Editor from "./components/Editor";
import { Renderer } from "./components/Renderer";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Editor />
      <Renderer />
    </div>
  );
};

export default App;

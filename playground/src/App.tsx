import { EventBus } from "@huajia/utils";
import { useState } from "react";
import Editor from "./components/Editor";
import { Renderer } from "./components/Renderer";
import { EventBusContext, EventMaps } from "./hooks/useEventBus";

const App = () => {
  const [eventBus] = useState(() => new EventBus<EventMaps>());
  return (
    <EventBusContext.Provider value={eventBus}>
      <div style={{ display: "flex" }}>
        <Editor />
        <Renderer />
      </div>
    </EventBusContext.Provider>
  );
};

export default App;

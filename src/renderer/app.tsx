import React, { useState } from "react";
import Icon from "./components/Icon/Icon";
import { useIpc } from "./hooks/useIpc";

function App() {
  const [smile, setSmile] = useState(false)

  useIpc<boolean>("test", (_, data) => {
    setSmile(data)
  });

  const smileHandler = () => {
    window.api.test(!smile)
  }

  return (
    <div 
      className="w-full h-dvh bg-zinc-800 bg-gradient-to-tl from-zinc-950 to-zinc-700 flex flex-col items-center justify-center gap-5"
    >
      <Icon name={smile ? "emoji-grin-fill" : "emoji-smile-fill"} className="w-48 after:bg-yellow-500 drop-shadow-xl"/>
      <button
        onClick={smileHandler}
        className="w-36 py-2 text-xl text-neutral-400 border border-neutral-900 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-900 hover:-translate-y-1 transition-all duration-300 shadow hover:shadow-xl cursor-pointer"
      >
        Smile
      </button>
    </div>
  );
}

export default App;
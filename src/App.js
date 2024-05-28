import { useState } from "react";
import "./styles.css";

export default function App() {
  const [curr, setCurr] = useState(0);
  const [mainHistory, setMainHistory] = useState([]);
  const [redoList, setredoList] = useState([]);
  const [count, setCount] = useState(0);
  const handleUndo = () => {
    if (mainHistory.length) {
      const copyHistory = [...mainHistory];
      const first = copyHistory.shift();
      setCurr(first.prev);
      setMainHistory(copyHistory);

      const copyredo = [...redoList];
      copyredo.push(first);
      setredoList(copyredo);
    }
  };
  const handleRedo = () => {
    if (redoList.length) {
      const copyredo = [...redoList];
      const last = copyredo.pop();
      const { action, prev, cur } = last;
      setCurr(cur);
      setredoList(copyredo);
      createObject(action, prev, cur);
    }
  };
  const createObject = (key, prev, cur) => {
    //console.log(key, prev, cur);
    const copyArray = [...mainHistory];
    const obj = {
      action: key,
      prev,
      cur,
    };
    copyArray.unshift(obj);
    setMainHistory(copyArray);
  };
  const handleAction = (key) => {
    const val = parseInt(key);
    createObject(key, curr, curr + val);
    setCurr((e) => e + val);
  };
  return (
    <div className="App">
      <h1>Undoable counter</h1>
      <div className="container">
        <div className="action-btn">
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleRedo}>Redo</button>
        </div>
        <div className="user-action">
          {[-100, -10, -1].map((item) => {
            return (
              <div>
                <button onClick={() => handleAction(item)}>{item}</button>
              </div>
            );
          })}
          <div style={{ color: "black", fontSize: "30px" }}>{curr}</div>
          {["+1", "+10", "+100"].map((item) => {
            return (
              <div>
                <button onClick={() => handleAction(item)}>{item}</button>
              </div>
            );
          })}
        </div>
        <div className="history-container">
          <h1>History</h1>
          <div className="history">
            {mainHistory.map((item) => {
              return (
                <div className="row">
                  <div>{item.action}</div>
                  <div>{`( ${item.prev} -> ${item.cur})`}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

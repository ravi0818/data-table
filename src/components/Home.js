import React, { useState } from "react";
import { data } from "../Data/data";

const Home = () => {
  const [state, setState] = useState([...data]);
  const [active, setActive] = useState(null);
  const [menu, setMenu] = useState(false);

  const onAsc = () => {
    let newData = state;
    newData.sort((a, b) => {
      const fa = a.first_name.toLowerCase();
      const fb = b.first_name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setState(newData);
    setMenu((prev) => !prev);
  };

  const onDesc = () => {
    let newData = state;
    newData.sort((a, b) => {
      const fa = a.first_name.toLowerCase();
      const fb = b.first_name.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
    setState(newData);
    setMenu((prev) => !prev);
  };

  const onUnsort = () => {
    setState(() => [...data]);
    setMenu((prev) => !prev);
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold p-2">Data Table</h1>
      </div>
      <div className="flex justify-center overflow-x-scroll">
        <table className="table-auto">
          <thead>
            <tr className="bg-slate-600 text-white">
              {Object.keys(state[0]).map((head) =>
                head !== "first_name" ? (
                  <td className="p-2 border uppercase" key={head}>
                    {head}
                  </td>
                ) : (
                  <td className="p-2 border uppercase" key={head}>
                    <div className="flex">
                      {head}
                      <button
                        className="px-3"
                        onClick={() => setMenu((prev) => !prev)}
                      >
                        {menu === true ? "︽" : "︾"}
                      </button>
                    </div>
                    <div
                      className={`p-1 mt-2 rounded absolute w-32 bg-slate-100 text-black flex flex-col ${
                        menu === true ? "block " : "hidden"
                      }`}
                    >
                      <button className="p-1 border" onClick={onUnsort}>
                        Unsort
                      </button>
                      <button className="p-1 border" onClick={onAsc}>
                        ASC
                      </button>
                      <button className="p-1 border" onClick={onDesc}>
                        DESC
                      </button>
                    </div>
                  </td>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {state.map((item) => (
              <tr
                key={item.id + item.first_name}
                className={`${
                  item.status === true ? "bg-green-500" : "bg-red-500"
                } ${active === item.id ? "bg-slate-500" : ""}`}
                onClick={() => setActive(item.id)}
              >
                {Object.values(item).map((val, index) => (
                  <td
                    className="p-2 border"
                    key={item.id + item.first_name + index}
                  >
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

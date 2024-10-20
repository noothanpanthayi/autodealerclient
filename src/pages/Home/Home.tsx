import React, { useState, useEffect } from "react";

import styles from "./home.module.css";

function Home() {
  type AutoList = {
    _id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };

  interface State {
    autoList: AutoList[];
  }

  const [state, setState] = useState<State>({
    autoList: [],
  });

  const fetchAuto = async () => {
    // const apiUrl=process.env.REACT_APP_API_URL;
    console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    const apiUrl: any =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/`
        : "/api/";
        console.log("apiUrl:", apiUrl);
    const header = await fetch(apiUrl);
    const autoList = await header.json();

    setState((prevState: any) => {
      return {
        ...prevState,
        autoList,
      };
    });
  };

  useEffect(() => {
    fetchAuto();
  }, []);

  return (
    <div>
      <h1>Auto List</h1>
      {state?.autoList?.map(({ _id, make, model, year, price, type }) => {
        return (
          <div className={card} key={_id}>
            <div className={content}>
              <div>
                {/* <img
                  width="200"
                  alt="picture of car"
                  src="/camry.png"
                /> */}
              </div>
              <div>
                <ul>
                  <li className={title}>{make}</li>
                  <li className={modelTitle}>{model}</li>
                  <li className={priceTitle}>
                    <span className={startTitle}>Starting at:</span>
                    {price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const { card, title, content, modelTitle, priceTitle, startTitle } = styles;

export default Home;

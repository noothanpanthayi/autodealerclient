import React, { useState, useEffect, Fragment } from "react";

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
        ? process.env.REACT_APP_API_URL
        : "/api/";
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
                <img
                  crossOrigin="anonymous"
                  width="200"
                  alt="picture of car"
                  src="https://media.rti.toyota.com/config/pub/3d/vcr/live/vehicle/TOY/2025/camry/2557/455/2ce0ab6f2abf2392135868d33ac516c6bf5199e10cec9bd1183f914e7dbfb58b.png?fit=crop&wid=1200&hei=663&efcview=Exterior&bfc=off&fmt=png-alpha"
                />
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

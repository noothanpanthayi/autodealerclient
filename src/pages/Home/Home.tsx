import React, { useState, useEffect, Fragment } from "react";

import styles from './home.module.css'

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
    const header = await fetch("/api/");
    const autoList = await header.json();

    setState((prevState:any) => {
      return {
        ...prevState,
        autoList,
      };
    });
  };

  useEffect(() => {
    fetchAuto();
  });

  return <div>
    {
        state?.autoList?.map(({_id, make, model, year, price, type})=>{
            return <div className={card} key={_id}>
            <div className={title}>{make}</div>
            <div>{model}</div>
            </div>
        })
    }
  </div>;
}

const {card, title}=styles;

export default Home;

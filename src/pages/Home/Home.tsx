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
    addAutoForm: boolean;
    userInput: {
      make: string;
      model: string;
      year: string;
      price: string;
      type: string;
    };
  }

  const [state, setState] = useState<State>({
    autoList: [],
    addAutoForm: false,
    userInput: {
      make: "Toyota",
      model: "",
      year: "",
      price: "",
      type: "",
    },
  });

  const fetchAuto = async () => {
    // const apiUrl=process.env.REACT_APP_API_URL;
    console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    const apiUrl: any =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/`
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

  useEffect(()=>{
    console.log("State:", state)
  })

  useEffect(() => {
    fetchAuto();
  }, [state.addAutoForm]);

  const updateAddAuto = () => {
    setState((prevState) => {
      return {
        ...prevState,
        addAutoForm: !prevState.addAutoForm,
      };
    });
  };

  const updateForm = (e: any) => {
    setState((prevState) => {
      return {
        ...prevState,
        userInput: {
          ...prevState.userInput,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const submit=async()=>{

    const fetchOptions={
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(state.userInput)
    }
    const apiUrl: any =
    process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_API_URL}/api/`
      : "/api/";
    const response=await fetch(apiUrl, fetchOptions);
    if (!response.ok){
      const errorMessage=await response.text();
      throw new Error(errorMessage)
    }
    

     setState((prevState:any)=>{
      console.log("posted..")
      return {
        ...prevState,
        addAutoForm:!prevState.addAutoForm
      }
     })


  }

  return (
    <div>
      <h1>Auto List</h1>
      <div>
        <button onClick={updateAddAuto}>Add Auto</button>
      </div>
      <div className={form}>
        {state.addAutoForm && (
          <>
            {/* make: string;
                model: string;
                year: number;
                price: number;
                type: string; 
          */}
            <ul>
              <li>
                <div>
                  <label>Make</label>
                </div>
                <div>
                  <input
                    name="make"
                    onChange={updateForm}
                    type="text"
                    value={state.userInput.make}
                  />
                </div>
              </li>
              <li>
                <div>
                  <label>Model</label>
                </div>
                <div>
                  <input 
                  name="model"
                  onChange={updateForm}
                  type="text" value={state.userInput.model} />
                </div>
              </li>
              <li>
                <div>
                  <label>Year</label>
                </div>
                <div>
                  <input 
                  name="year"
                  onChange={updateForm}
                  type="text" value={state.userInput.year} />
                </div>
              </li>
              <li>
                <div>
                  <label>Price</label>
                </div>
                <div>
                  <input name="price"
                    onChange={updateForm}
                    type="text" value={state.userInput.price} />
                </div>
              </li>
              <li>
                <div>
                  <label>Type</label>
                </div>
                <div>
                  <input 
                  name="type"
                  onChange={updateForm}
                  type="text" value={state.userInput.type} />
                </div>
              </li>
              <li>
                <div>&nbsp;</div>
                <div>
                  <button onClick={submit}>Submit</button>
                </div>
              </li>
            </ul>
          </>
        )}
      </div>
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

const { card, title, content, modelTitle, priceTitle, startTitle, form } =
  styles;

export default Home;

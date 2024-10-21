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
    loading: boolean;
    selectedRows: [];
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
    loading: false,
    selectedRows: [],
    userInput: {
      make: "",
      model: "",
      year: "",
      price: "",
      type: "",
    },
  });

  const fetchAuto = async () => {
    // const apiUrl=process.env.REACT_APP_API_URL;
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

  useEffect(() => {
    // console.log("State:", state);
  });

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

  const loadingFalse=()=>{
    setState((prevState: any) => {
      return {
        ...prevState,
        loading: false,
        addAutoForm: !prevState.addAutoForm,
      };
    });
  }

  const submit = async () => {
    /*

    make: "",
      model: "",
      year: "",
      price: "",
      type: "",
    */

    const { make, model, year, price, type } = state.userInput;

    if (
      make.trim().length === 0 ||
      model.trim().length === 0 ||
      year.trim().length === 0 ||
      price.trim().length === 0 ||
      type.trim().length === 0
    ) {
      alert("Please Enter all the fields");
      loadingFalse();
      return false;
    }

    const regExpNum = /^\d+$/;

    if (!regExpNum.test(year) || !regExpNum.test(price)) {
      alert("Please Enter a Numeric value for Year/Price");
      loadingFalse();
      return false;
    }

    setState((prevState: any) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(state.userInput),
    };
    const apiUrl: any =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/`
        : "/api/";
    const response = await fetch(apiUrl, fetchOptions);
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    setState((prevState: any) => {
      return {
        ...prevState,
        loading: false,
        addAutoForm: !prevState.addAutoForm,
      };
    });
  };

  const deleteRow = async () => {
    setState((prevState: any) => {
      return {
        ...prevState,
        loading: true,
      };
    });
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify(state.selectedRows),
    };

    const apiUrl: any =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/`
        : "/api/delete";

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    setState((prevState: any) => {
      console.log("posted..");
      return {
        ...prevState,
        loading: false,
      };
    });
  };

  const handleCheckBox = (e: any) => {
    let selectedRows: any;
    setState((prevState: any) => {
      let selAuto = prevState.autoList.find((auto: any) => {
        return auto._id === e.target.value;
      });
      selectedRows = [...prevState.selectedRows, selAuto];

      if (!e.target.checked) {
        selectedRows = state.selectedRows.filter((row: AutoList) => {
          return row._id !== e.target.value;
        });
      }

      return {
        ...prevState,
        selectedRows,
      };
    });

    // state.autoList.filter(row=>{

    // })
  };

  const handleNewDelete = async (e: any) => {
    alert("hey");
    console.log("e.target.value ", e.target.id);
    const id = e.target.value;
    const fetchOptions = {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json"
      //   // Accept: "application/json",
      // },
      // body: JSON.stringify(state.selectedRows),
    };

    const apiUrl: any =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/${id}`
        : `/api/${id}`;

    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    setState((prevState: any) => {
      console.log("posted..");
      return {
        ...prevState,
        loading: false,
      };
    });
  };

  return (
    <div>
      
      <div className={mainDesc}>This <strong>ReactJs</strong> application uses&nbsp;
      <strong>Node.js</strong> and <strong>Express</strong> to read and write into &nbsp;
      <strong>MongoDB</strong> at the backend
      </div>
      <h1>Auto List</h1>
      <div style={{ display: "flex" }}>
        <button className={addButton} onClick={updateAddAuto}>
          <div>Add Row</div>
          <div className={spinner}>
            {state.loading && (
              <img width="20" src="/spinner.gif" alt="spinner" />
            )}
          </div>
        </button>

        {/* <button className={addButton} onClick={deleteRow}>
          <div>Delete Row</div>
          <div className={spinner}>
            {state.loading && (
              <img width="20" src="/spinner.gif" alt="spinner" />
            )}
          </div>
        </button> */}
      </div>
      <div className={form}>
        {state.addAutoForm && (
          <>
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
                    type="text"
                    value={state.userInput.model}
                  />
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
                    type="text"
                    value={state.userInput.year}
                  />
                </div>
              </li>
              <li>
                <div>
                  <label>Price</label>
                </div>
                <div>
                  <input
                    name="price"
                    onChange={updateForm}
                    type="text"
                    value={state.userInput.price}
                  />
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
                    type="text"
                    value={state.userInput.type}
                  />
                </div>
              </li>
              <li>
                <div>&nbsp;</div>
                <div style={{ display: "flex" }}>
                  <button className={submitBtn} onClick={submit}>
                    Submit
                  </button>
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
                  {/* <li className={chkBox}><input type="checkbox" /></li> */}
                  <li className={title}>
                    <div>
                      {/* <input onChange={handleCheckBox} value={_id} className={chkBox} type="checkbox" /> */}
                      {/* <button id={_id} onClick={handleNewDelete}>Delete</button> */}
                    </div>
                    <div className={marginLeft}>{make}</div>
                  </li>
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

const {
  card,
  title,
  content,
  modelTitle,
  priceTitle,
  startTitle,
  form,
  addButton,
  spinner,
  submitBtn,
  marginLeft,
  mainDesc
} = styles;

export default Home;

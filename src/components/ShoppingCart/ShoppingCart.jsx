/* eslint-disable react-hooks/exhaustive-deps */
/*jshint esversion: 9 */
import React from "react";
import Blank from "../../images/blank.svg";
import { Link } from "react-router-dom";
import Back from "../../images/back.svg";
import { Grid } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useEffect, useState } from "react";
import Left from "../homepage/leftimages/LeftImages";
import Tape from "../../images/tape.svg";
import Pay from "../../images/payment.svg";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import Card2 from "../category_page/Card2";
import Axios from "axios";
import { createOrder, updateUser } from "../../helper/apiPath";
import { BottomAddedCart } from "../product_list2/right/Right";
import { findMat, findDim } from "../../helper/apiPath";
import Otp from "../login/Otp";
import $ from "jquery";
import { Input } from "@material-ui/core";
import EhsLogo from "../../images/EhsLogo.svg";
import { login, signup } from "../../helper/apiPath";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

const Tables = (props) => {
  const [emailid1, setEmailId1] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [phonenumber1, setPhonenumber1] = React.useState("");
  const [token, setToken] = React.useState("");
  const [isToken, setIsToken] = React.useState(false);
  const [loginBody1, setLoginBody1] = React.useState({});

  const [userJson, setUserJson] = React.useState({});

  function mySubmitHandle(event) {
    event.preventDefault();
  }

  function signupReq(loginBody1) {
    Axios.post(signup, loginBody1)
      .then((res) => {
        if (res.data.token) {
          setIsToken(true);
          setToken(res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [modalCarousel, setModalCarousel] = useState({
    one: true,
    two: false,
    three: false,
  });

  const [emailid, setEmailId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");

  const [address, setAddress] = React.useState("");
  const [state, setState] = React.useState("");
  const [name, setName] = React.useState("");
  const [pincode, setPincode] = React.useState("");

  const [loginBody, setLoginBody] = React.useState({});

  function session(r) {
    localStorage.setItem("userDetails123", JSON.stringify(r));
  }

  function responseFun(d) {
    setUserJson(
      JSON.parse(localStorage.getItem("userDetails123")) || {
        user: {},
      }
    );
    alert(d);
  }

  function loginReq(loginBody) {
    Axios.post(login, loginBody)
      .then((res) => {
        session(res.data.user);
        responseFun(res.data.message);
        setModalCarousel({
          one: false,
          two: false,
          three: true,
        });
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  const cartDet = JSON.parse(localStorage.getItem("listCart12345678910")) || {
    cartList: [],
  };

  const [numCart, setNumCart] = useState(cartDet.cartList);

  const [num, setNum] = useState(props.navCount || 0);

  const [totalPay, setTotalPay] = React.useState(0);

  const [shipping, setShipping] = React.useState(220);

  var addr;

  function calculate(e) {
    let temp = 0;
    e.map((v) => (temp += v.quantity * v.originalPrice));
    setTotalPay(temp);
    temp > 1999 ? setShipping(0) : setShipping(220);
    return temp;
  }

  function orderPlaced(res) {
    Axios.post(createOrder, {
      userId: userJson._id,
      itemDetails: cartDet.cartList,
      total: totalPay + shipping,
      paymentId: res.razorpay_payment_id,
      orderId: res.razorpay_order_id,
      status: "Order Confirmed",
      address: addr,
      emailid: userJson?.emailid,
      phonenumber: userJson?.phonenumber,
    })
      .then((res) => {
        alert(res.data.message);
        localStorage.removeItem("listCart12345678910");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function proceed() {
    if ($("#oldAdd").is(":checked")) {
      addr = userJson.address;
    } else if ($("#newAdd").is(":checked")) {
      addr =
        "Name:" +
        name +
        "  |  Landmark:" +
        address +
        "  |  State:" +
        state +
        "  |  Pincode:" +
        pincode;
    } else {
      addr = userJson.emailid || userJson.phonenumber;
    }

    Axios.post(updateUser, {
      emailid: userJson?.emailid,
      phonenumber: userJson?.phonenumber,
      address: addr,
    })
      .then((res) => {
        $("#modalCls").trigger("click");
        userJson["address"] = addr;
        session(userJson);
        displayRazorpay();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function proceed1() {
    addr =
      "Name:" +
      name +
      "  | Landmark:" +
      address +
      "  | State:" +
      state +
      "  | Pincode:" +
      pincode;

    Axios.post(updateUser, {
      emailid: userJson?.emailid,
      phonenumber: userJson?.phonenumber,
      address: addr,
    })
      .then((res) => {
        $("#modalCls").trigger("click");
        userJson["address"] = addr;
        session(userJson);
        displayRazorpay();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setUserJson(
      JSON.parse(localStorage.getItem("userDetails123")) || {
        user: {},
      }
    );
  }, []);

  useEffect(() => {
    setTotalPay(calculate(numCart));
    totalPay > 1999 ? setShipping(0) : setShipping(220);
  }, []);

  function paymentFun() {
    $("#modalBut").trigger("click");
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:8080/razorpay", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalPay + shipping }),
    }).then((t) => t.json());

    const options = {
      key: __DEV__ ? "rzp_test_FvIgaLsvcCd3vG" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Payment",
      description: "Thank you for Shopping with us. Please visit again",
      image:
        "https://ehsprints.com/wp-content/uploads/2018/12/cropped-EHS_-NEW_LOGO-1-300x93.jpg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        orderPlaced(response);
      },
      prefill: {
        name: userJson?.firstname + userJson?.lastname,
        email: userJson?.emailid,
        phone_number: userJson?.phonenumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const updateCart = (index, type) => {
    let temp = [...numCart];
    let indexedCart = { ...temp[index] };

    if (type) indexedCart.quantity += 1;
    else if (indexedCart.quantity > 1) indexedCart.quantity -= 1;

    temp[index] = indexedCart;
    setNumCart(temp);

    let temp2 = [...cartDet.cartList];
    let indexedCart2 = { ...temp2[index] };

    if (type) indexedCart2.quantity += 1;
    else if (indexedCart2.quantity > 1) indexedCart2.quantity -= 1;

    temp2[index] = indexedCart2;

    let cartLocal = { cartList: [...temp2] };
    localStorage.setItem("listCart12345678910", JSON.stringify(cartLocal));

    calculate(cartLocal.cartList);
  };

  const remove = (index) => {
    let result = numCart.filter((v, i) => i !== index);
    setNumCart(result);

    let cartLocal = { cartList: [...result] };
    localStorage.setItem("listCart12345678910", JSON.stringify(cartLocal));
    setNum(num - 1);
    props.setCartCount(props.navCount - 1);
    setTotalPay(calculate(cartLocal.cartList));
  };

  function check() {
    if (numCart.length > 0) {
      userJson.emailid || userJson.phonenumber
        ? setModalCarousel({
            one: false,
            two: false,
            three: true,
          })
        : setModalCarousel({
            one: true,
            two: false,
            three: false,
          });
      paymentFun();
    } else {
      alert("No Items in Your Cart");
    }
  }
  // const cardDet = {
  //   src: DisInfect,
  //   title: "Floor Graphics | Printable Catalog | PRD-FG009",
  //   by: "By Pankaj Jadhav",
  //   isInStock: true,
  //   rate: 4.6,
  //   bought: "473",
  //   price: 400,
  // };

  const [bottomDet] = React.useState({});

  // const addToCart = (det) => {
  //   setBottomDet(det);
  //   $("#bottomCart").css("display", "block");
  //   props.setCartCountFun(det);
  //   console.log("hello", bottomDet);
  // };

  const leftImages = [Blank, Blank];
  return (
    <div className="row">
      <div className="col-3 justify-content-center mt-5 pt-3">
        <Link to="/login">
          <button
            className="btn shadow-none p-2 ml-4"
            style={{
              border: "1px solid #003459",
              width: "234px",
              borderRadius: " 5px",
            }}
          >
            <span className="loginbtn">
              Login or Sign up to save your Shopping Cart
            </span>
          </button>
        </Link>
        <Left imgs={leftImages} />
      </div>
      <div className="col mt-5 pt-3 ">
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column
              style={{ width: "65%", marginLeft: "-20px", marginRight: "15px" }}
            >
              {" "}
              <div className="mb-4">
                <img
                  src={Back}
                  className="mr-1"
                  width="10"
                  height="10"
                  alt=""
                />
                <Link className="breadLink mt" to="/">
                  Back To Shopping
                </Link>
              </div>
              <div>
                <p className="tablecart">Shopping Cart ({num} items)</p>
                <p className="pay2">Shop above ₹2000 to get free shipping</p>
              </div>
              {num > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="tablehead" scope="col">
                        Item
                      </th>
                      <th className="tablehead" scope="col">
                        Quantity
                      </th>
                      <th className="tablehead pl-3" scope="col">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {numCart.map((v, i) => (
                      <tr key={i}>
                        <td className="mr-0" style={{ width: "460px" }}>
                          <Grid>
                            <Grid.Row columns="2">
                              <Grid.Column>
                                <img
                                  src={v.imgUrl}
                                  width="120px"
                                  height="140px"
                                  alt={v.name}
                                />
                              </Grid.Column>
                              <Grid.Column className="ml-4 mt-2 mr-0">
                                <p
                                  className="tabletitle p-0 mb-2"
                                  style={{ width: "230px" }}
                                >
                                  {v.name}
                                </p>
                                <p
                                  className="tabledata p-0 m-0"
                                  style={{ width: "300px" }}
                                >
                                  Material : <span>{findMat(v.Material)}</span>
                                </p>
                                <p
                                  className="tabledata p-0 m-0"
                                  style={{ width: "300px" }}
                                >
                                  Dimension :{" "}
                                  <span>{findDim(v.Dimension)}</span>
                                </p>
                                <p className="tabledata p-0 m-0">
                                  Price : <span>₹ {v.originalPrice}</span>
                                </p>
                                <div className="mt-3">
                                  <p
                                    className="tabledata"
                                    onClick={() => remove(i)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Remove
                                  </p>
                                </div>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </td>
                        <td className="ml-0" style={{ width: "150px" }}>
                          <ButtonGroup
                            size="small"
                            className="justify-content-center ml-3 mt-5"
                            aria-label="small outlined button group"
                            style={{ height: "30px", width: "30px" }}
                          >
                            <Button
                              onClick={() => updateCart(i, false)}
                              className="shadow-none"
                            >
                              <RemoveIcon style={{ color: "grey" }} />
                            </Button>
                            <Button
                              style={{
                                fontFamily: "Lato",
                                fontStyle: "normal",
                                fontWeight: "normal",
                                fontSize: "18px",
                                lineHeight: "22px",
                                color: "#000000",
                                paddingLeft: "18px",
                                paddingRight: "18px",
                              }}
                            >
                              {v.quantity}
                            </Button>
                            <Button onClick={() => updateCart(i, true)}>
                              <AddIcon style={{ color: "grey" }} />
                            </Button>
                          </ButtonGroup>
                        </td>
                        <td>
                          <p className="mt-5">
                            ₹{v.originalPrice * v.quantity}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign: "center", marginTop: "150px" }}>
                  <p style={{ fontSize: "30px" }} className="tablecart">
                    Nothing in your Cart
                  </p>
                  <Link to="/">Buy Some Items</Link>
                </div>
              )}
            </Grid.Column>
            <Grid.Column style={{ width: "35%" }}>
              <img
                src={Tape}
                alt=""
                style={{ position: "absolute", right: "120px", top: "-4px" }}
              />
              <div
                className="ml-4 mr-4 "
                style={{
                  border: "1px solid #D2D2D2",
                  textAlign: "center",
                }}
              >
                <Button
                  className="text-white"
                  style={{
                    width: "250px",
                    marginTop: "40px",
                    height: "50px",
                    backgroundColor: "#F2994A",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "14px",
                    lineHeight: "19px",
                    borderRadius: "5px",
                  }}
                >
                  Request a Quote{" "}
                </Button>
                <div
                  className=" pl-4 mt-2   pay"
                  style={{
                    width: "250px",
                    borderBottom: "1px solid #D2D2D2",
                    marginLeft: "31px",
                  }}
                >
                  <p
                    style={{
                      width: "200px",
                    }}
                  >
                    Get a quote for the items in cart with their prices at your
                    email address
                  </p>
                </div>

                <p className="orderDet">Order Details</p>

                <table width="250px" style={{ marginLeft: "32px" }}>
                  <tbody>
                    <tr height="30px">
                      <td className="pri left">Price</td>
                      <td className="pri right">₹{totalPay}</td>
                    </tr>
                    <tr height="30px">
                      <td className="shi left">Shipping</td>
                      <td className="shi right">₹{shipping}</td>
                    </tr>
                    <tr height="30px">
                      <td className="shi left">Discount</td>
                      <td className="shi right">₹0.00</td>
                    </tr>

                    <tr
                      height="50px"
                      style={{
                        borderTop: "1px solid #D2D2D2",
                        borderBottom: "1px solid #D2D2D2",
                      }}
                    >
                      <td className="pri left">Total Price</td>
                      <td className="pri right">₹{totalPay + shipping}</td>
                    </tr>
                  </tbody>
                </table>

                <Button
                  className="text-white"
                  style={{
                    width: "250px",
                    marginTop: "20px",
                    height: "50px",
                    backgroundColor: "#003459",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "14px",
                    lineHeight: "19px",
                    borderRadius: "5px",
                  }}
                  onClick={check}
                  target="_blank"
                >
                  Proceed to Payment{" "}
                </Button>

                <table
                  width="250px"
                  style={{
                    marginLeft: "32px",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td className="pri left">
                        <a href="/#" className="bnk">
                          Bank Transfer
                        </a>
                      </td>
                      <td rowSpan="3">
                        <img src={Pay} alt="" width="130px"></img>
                      </td>
                    </tr>
                    <tr>
                      <td className="shi left">
                        {" "}
                        <a href="/#" className="bnk">
                          Cheque Payment
                        </a>
                      </td>
                    </tr>
                    <tr height="30px">
                      <td className=" left">
                        <p
                          className="bnk mt-1"
                          style={{ color: "#003459", width: "120px" }}
                        >
                          Pay Offline by <br /> generating Performa
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ml-5 mt-3">
                <p className="promo">Use a Promo Code</p>
                <OutlinedInput style={{ width: "250px", height: "40px" }} />
                <a
                  href="/#"
                  className="apply"
                  style={{
                    position: "absolute",
                    right: "75px",
                    marginTop: "7px",
                  }}
                >
                  Apply
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>

          {/*
          <Grid.Row className="orderDet mt-2" style={{ marginLeft: "-50px" }}>
            My Wishlist
          </Grid.Row>
          <Grid.Row className="mt-3">
            {[...Array(4)].map((v, i) => (
              <Grid.Column key={i} className={i !== 0 ? "ml-3" : "m-0 p-0"}>
                <Card2
                  data={cardDet}
                  addToCart={addToCart}
                  isCardClickAvail={true}
                />
                <div>
                  {[...Array(2)].map((v, i) => (
                    <div
                      key={i}
                      className={i !== 0 ? "carddiv mt-1" : "carddiv"}
                    >
                      <p className="pee">15% off on Self-adhesive sunboard</p>
                    </div>
                  ))}
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
         */}
        </Grid>
      </div>

      <div
        className="mt-5"
        style={{ width: "100%", height: "200px", background: "#003459" }}
      ></div>

      <div
        id="bottomCart"
        className="pt-3 pl-4"
        style={{
          width: "320px",
          height: "150px",
          backgroundColor: "white",
          zIndex: "22",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          boxShadow: "0px 2px 20px 4px rgba(0, 0, 0, 0.25)",
          display: "none",
        }}
      >
        <BottomAddedCart det={bottomDet} />
      </div>

      <button
        type="button"
        id="modalBut"
        style={{ display: "none" }}
        className="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >
        Open Modal
      </button>

      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ background: "none", border: "none" }}
          >
            <div className="modal-body">
              {modalCarousel.two ? (
                <>
                  <div className="loginPage p-5 mx-auto d-block">
                    <img
                      className="mx-auto d-block"
                      id="ehsLogoImg"
                      src={EhsLogo}
                      alt="Ehs Logo"
                    />

                    <p id="ehsLogoLabel" className="text-center mt-3">
                      Log Into your account
                    </p>

                    <input
                      className="mx-auto d-block mt-3"
                      id="loginUserEmail"
                      pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                      type="text"
                      onChange={(e) => {
                        document.getElementById("loginUserPhone").value = "";
                        setEmailId(e.target.value);
                        setLoginBody({
                          emailid: e.target.value,
                          password: password,
                        });
                      }}
                      placeholder="Email"
                    />

                    <p className="text-center mt-2`">or</p>

                    <input
                      className="mx-auto d-block "
                      id="loginUserPhone"
                      pattern="[0-9]{10}"
                      type="text"
                      onChange={(e) => {
                        document.getElementById("loginUserEmail").value = "";
                        setPhonenumber(e.target.value);
                        setLoginBody({
                          password: password,
                          phonenumber: e.target.value,
                        });
                      }}
                      placeholder="Phone Number"
                    />
                    <input
                      className="mx-auto d-block mt-3"
                      id="loginUserPass"
                      type="password"
                      minLength="6"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (loginBody1.emailid) {
                          setLoginBody({
                            emailid: emailid,
                            password: e.target.value,
                          });
                        } else if (loginBody1.emailid) {
                          setLoginBody({
                            phonenumber: phonenumber,
                            password: e.target.value,
                          });
                        } else {
                          setLoginBody({
                            emailid: emailid,
                            phonenumber: phonenumber,
                            password: e.target.value,
                          });
                        }
                      }}
                      placeholder="Password"
                    />

                    <div className="mt-2 ml-3">
                      <button
                        id="loginBtn"
                        className="mt-2"
                        onClick={() => loginReq(loginBody)}
                      >
                        Log In
                      </button>
                    </div>

                    <p className="text-center mt-1">or</p>

                    <button
                      id="signupBtn"
                      className="ml-3 d-block"
                      onClick={() =>
                        setModalCarousel({
                          one: true,
                          two: false,
                          three: false,
                        })
                      }
                    >
                      Create an account
                    </button>
                  </div>
                </>
              ) : null}
              {modalCarousel.one ? (
                <>
                  <>
                    {isToken ? (
                      <div>
                        <Otp
                          token={token}
                          setModalCarousel={setModalCarousel}
                        />
                      </div>
                    ) : (
                      <div className="loginPage p-5 mx-auto d-block">
                        <img
                          className="mx-auto d-block"
                          id="ehsLogoImg"
                          src={EhsLogo}
                          alt="Ehs Logo"
                        />

                        <p id="ehsLogoLabel" className="text-center mt-3">
                          Create Account
                        </p>

                        <form
                          onSubmit={(e) => {
                            signupReq(loginBody1);
                            mySubmitHandle(e);
                          }}
                        >
                          <input
                            className="mx-auto d-block mt-3"
                            id="loginUserEmail"
                            pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                            type="text"
                            onChange={(e) => {
                              document.getElementById("loginUserPhone").value =
                                "";
                              setEmailId1(e.target.value);
                              setLoginBody1({
                                emailid: e.target.value,
                                password: password1,
                              });
                            }}
                            placeholder="Email"
                          />

                          <p className="text-center mt-2`">or</p>

                          <input
                            className="mx-auto d-block "
                            id="loginUserPhone"
                            pattern="[0-9]{10}"
                            type="text"
                            onChange={(e) => {
                              document.getElementById("loginUserEmail").value =
                                "";
                              setPhonenumber1(e.target.value);
                              setLoginBody1({
                                password: password1,
                                phonenumber: e.target.value,
                              });
                            }}
                            placeholder="Phone Number"
                          />
                          <input
                            className="mx-auto d-block mt-3"
                            id="loginUserPass"
                            type="password"
                            minLength="6"
                            onChange={(e) => {
                              setPassword1(e.target.value);
                              if (loginBody1.emailid) {
                                setLoginBody1({
                                  emailid: emailid1,
                                  password: e.target.value,
                                });
                              } else if (loginBody1.emailid) {
                                setLoginBody1({
                                  phonenumber: phonenumber1,
                                  password: e.target.value,
                                });
                              } else {
                                setLoginBody1({
                                  emailid: emailid1,
                                  phonenumber: phonenumber1,
                                  password: e.target.value,
                                });
                              }
                            }}
                            placeholder="Password"
                          />

                          <button
                            id="loginBtn"
                            className="mt-4"
                            style={{ marginLeft: "13px" }}
                            type="submit"
                          >
                            Sign Up
                          </button>

                          <p className="text-center mt-2">or</p>

                          <button
                            id="signupBtn"
                            className="d-block "
                            style={{ marginLeft: "13px" }}
                            onClick={() =>
                              setModalCarousel({
                                one: false,
                                two: true,
                                three: false,
                              })
                            }
                          >
                            Log In
                          </button>
                        </form>
                      </div>
                    )}
                  </>
                </>
              ) : null}
              {modalCarousel.three ? (
                <>
                  <div className="loginPage p-5 mx-auto d-block">
                    <img
                      className="mx-auto d-block"
                      id="ehsLogoImg"
                      src={EhsLogo}
                      alt="Ehs Logo"
                    />

                    <p id="ehsLogoLabel" className="text-center mt-3">
                      Add Address
                    </p>

                    {userJson?.address ? (
                      <>
                        <div style={{ marginLeft: "20px" }}>
                          <Grid.Row columns="2" style={{ marginLeft: "1px" }}>
                            <Grid.Column style={{ width: "4%" }}>
                              <input
                                type="radio"
                                id="oldAdd"
                                name="old"
                                value={userJson?.address}
                                defaultChecked
                              />
                            </Grid.Column>
                            <Grid.Column
                              className="ml-3"
                              style={{ width: "90%" }}
                            >
                              <p>{userJson.address}</p>
                            </Grid.Column>
                          </Grid.Row>
                        </div>
                        <div style={{ marginLeft: "20px" }}>
                          <input
                            type="radio"
                            id="newAdd"
                            name="old"
                            style={{
                              position: "absolute",
                              marginTop: "20px",
                            }}
                          />
                          <label
                            htmlFor="newAdd"
                            style={{ marginLeft: "33px" }}
                          >
                            <Grid.Row columns="2">
                              <Grid.Column className="ml-3">
                                <Input
                                  className="mx-auto d-block mt-3"
                                  type="text"
                                  placeholder="Name"
                                  variant="outlined"
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </Grid.Column>
                              <Grid.Column className="ml-5">
                                <Input
                                  className="mx-auto d-block mt-3 ml-2"
                                  type="text"
                                  placeholder="Address"
                                  variant="outlined"
                                  onChange={(e) => setAddress(e.target.value)}
                                />
                              </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns="2">
                              <Grid.Column className="ml-3">
                                {" "}
                                <Input
                                  className="mx-auto d-block mt-3"
                                  type="text"
                                  placeholder="State/Country"
                                  variant="outlined"
                                  onChange={(e) => setState(e.target.value)}
                                />
                              </Grid.Column>
                              <Grid.Column className="ml-5">
                                <Input
                                  className="mx-auto d-block mt-3"
                                  type="text"
                                  placeholder="Pincode"
                                  variant="outlined"
                                  onChange={(e) => setPincode(e.target.value)}
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </label>
                        </div>
                        <button
                          id="loginBtn"
                          className="ml-3 mt-2 d-block"
                          onClick={proceed}
                        >
                          Add Address
                        </button>
                      </>
                    ) : (
                      <>
                        <Grid.Row columns="2" className="ml-4">
                          <Grid.Column className="ml-4">
                            <Input
                              className="mx-auto d-block mt-3"
                              type="text"
                              placeholder="Name"
                              variant="outlined"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Grid.Column>
                          <Grid.Column className="ml-5">
                            <Input
                              className="mx-auto d-block mt-3 ml-2"
                              type="text"
                              placeholder="Address"
                              variant="outlined"
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns="2" className="ml-4">
                          <Grid.Column className="ml-4">
                            {" "}
                            <Input
                              className="mx-auto d-block mt-3"
                              type="text"
                              placeholder="State/Country"
                              variant="outlined"
                              onChange={(e) => setState(e.target.value)}
                            />
                          </Grid.Column>
                          <Grid.Column className="ml-5">
                            <Input
                              className="mx-auto d-block mt-3"
                              type="text"
                              placeholder="Pincode"
                              variant="outlined"
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <button
                          id="loginBtn"
                          className="ml-3 mt-4 d-block"
                          onClick={proceed1}
                        >
                          Add Address
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <div className="modal-footer" style={{ display: "none" }}>
              <button
                type="button"
                id="modalCls"
                className="btn btn-default"
                style={{ display: "none" }}
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;

/*jshint esversion: 6 */
import React from "react";
import Design from "./design/Design";
import "./HomePageNew.css"
import Collections from "./collections/Collections";
import BottomImg from "../../images/BottomImg.svg";
import Promotions from "./promotions/Promotions"
import PrintPromise from "./printPromise/PrintPromise";
// import Bestsellers from "./bestsellers/Bestsellers";
import Bestsellers from "./bestsellers/BestsellersNew";
import Visitor from "./visitor/Visitor";
import satisfaction from "../../images/Satisfaction.png";
import customer from "../../images/customer.png";
import payment from "../../images/payment.png";
import homepagePoster from "../../images/homePagePoster.png"
import paymentNew from "../../images/credit-card.png"
import customerNew from "../../images/customer-care.png"
import satisfactionNew from "../../images/comment.png"
import posterTag from "../../images/Group_99.png";
import signagesTag from "../../images/Group_100.png";
import floorTag from "../../images/Group_101.png";
import assetTag from "../../images/Group_102.png";
import { Link } from "react-router-dom";
import poster from "../../images/posters.png"
import signages from "../../images/signages.png"
import fg from "../../images/fg.png"
import as from "../../images/as.png"


const HomePage = (props) => {
  const [authUser, setAuthUser] = React.useState("");
  React.useEffect(() => {
     document.title = "Ehs prints";
     if (JSON.parse(localStorage.getItem("userDetails123")))
       setAuthUser(
         JSON.parse(localStorage.getItem("userDetails123")).emailid ||
           JSON.parse(localStorage.getItem("userDetails123")).phonenumber
       );
   }, [props.loginResponse]);
   const screenWidth = window.innerWidth;
  return (
    <>
        <div className="padding-10 d-flex justify-content-between mb-4  mt-4 ">
            <div className="">
                <p className="taglineN">The Best Environment, Health and Safety Prints for your Workplace</p>
                <div className="d-lg-block d-none" style={{marginRight:"20px"}} >
                    <p className="taglineN1">What would you like to order today</p>
                    <div className="d-flex flex-row  justify-content-between">
                        <Link to="/cat/posters" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={poster} alt="poster" className="" />
                           
                        </div>
                        </Link>
                        <Link to="/cat/signages" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={signages} alt="poster" className="" />
                            
                        </div>
                        </Link>
                        <Link to="/cat/floor-graphics" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={fg} alt="poster" className="" />
                            
                        </div>
                        </Link>
                        <Link to="/cat/asset-markings" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={as} alt="poster" className="" />
                            
                        </div>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className="  ">
                <img src={homepagePoster} className="homepagePoster" />
            </div>
        </div>
        <div className="padding-10 mt-2 d-block d-lg-none  mb-4 mx-2  " >
                    <p className="taglineN1">What would you like to order today</p>
                    <div className="d-flex flex-row  justify-content-between " style={{marginLeft:"-20px"}}>
                        <Link to="/cat/posters" className="tagHome mx-2">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={poster} alt="poster" className="tagImgP" />
                            
                        </div>
                        </Link>
                        <Link to="/cat/signages" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={signages} alt="poster" className="tagImg" />
                            
                        </div>
                        </Link>
                        <Link to="/cat/floor-graphics" className="tagHome">
                        <div className="Rectangle_68_ke" id="Rectangle_68_ke">
                            <img src={fg} alt="poster" className="tagImgD" />
                         
                        </div>
                        </Link>
                        <Link to="/cat/asset-markings" className="tagHome">
                        <div className="Rectangle_68_ke " id="Rectangle_68_ke">
                            <img src={as} alt="poster" className="tagImgD" />
                            
                        </div>
                        </Link>
                       
                    </div>
                </div>
      <Promotions />
      <PrintPromise />
      <Visitor />
      <div style={{
        borderTop: "6px solid #F6F6F6",
        margin: "20px 0 20px 0"
      }}></div>
      <Bestsellers />
      <div className=" container mx-auto my-3">      
        <div className="col-md-4 inline my-2 mx-auto">
          <div className="text-center inline img-bg" style={{verticalAlign:"middle" ,width:"90px",height:"90px", borderRadius: "50%",background: "#F4F3F4"}}>
            <img src={paymentNew} alt="payment" className="img text-center mt-4" />
          </div>
          <div className="inline ml-4" style={{verticalAlign:"middle"}}>
            <p className=" mb-0 img-text" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "23px",
              color: "#000000",
            }}>Payment</p>
            <p  className=" mb-0 img-sub" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#9A999F",
            }}>Secure</p>
          </div>
        </div>
        <div className="col-md-4 inline my-2">
          <div className="text-center inline" style={{verticalAlign:"middle" ,width:"90px",height:"90px", borderRadius: "50%",background: "#F4F3F4"}}>
            <img src={customerNew} alt="payment" className="text-center mt-4" />
          </div>
          <div className="inline ml-4" style={{verticalAlign:"middle"}}>
            <p className=" mb-0" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "23px",
              color: "#000000",
            }}>24/7 Customer Care</p>
            <p  className=" mb-0" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#9A999F",
            }}>Mon to Fri (9:00 to 17:00)</p>
          </div>
        </div><div className="col-md-4 inline my-2">
          <div className="text-center inline" style={{verticalAlign:"middle" ,width:"90px",height:"90px", borderRadius: "50%",background: "#F4F3F4"}}>
            <img src={satisfactionNew} alt="payment" className="text-center mt-4" />
          </div>
          <div className="inline ml-4" style={{verticalAlign:"middle"}}>
            <p className=" mb-0" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "23px",
              color: "#000000",
            }}>100% Satisfaction</p>
            <p  className=" mb-0" style={{
              fontFamily: "Source Sans Pro",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#9A999F",
            }}>Feedbacks</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

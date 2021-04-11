import React from "react";
import {FaStar} from "react-icons/fa";

const RateShow =({number })=> {
  
  
    const i=number;
    var j=0;
      
    return (
      
      [ ...Array(i)].map((star) =>{
        
        return (
          
          <FaStar key={j++} className="star" 
            
            size={20}
            color="#ffc107"
            />
           
        )
      })
    );
  }


export default RateShow;

import React,{useState} from "react";
import {FaStar} from "react-icons/fa";

const Rate =({ id, onChange })=> {
  
  
    const [rating, setRating] =useState(null);
      const [hover, setHover] =useState(null);
    return (
      
      [ ...Array(5)].map((star,i) =>{
        const ratingValue = i + 1;
        return (
          <label key={ratingValue}>
            <input type="radio" 
            name="rating"
            id={id}
            
            onChange={onChange} 
            value={ratingValue} 
            onClick={()=> setRating(ratingValue)}/>
            <FaStar className="star" 
            size={40}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "gray"} 
            onMouseEnter={()=> setHover(ratingValue)} 
            onMouseLeave={()=>setHover(null)}/>
          </label>
        )
      })
    );
  }


export default Rate;

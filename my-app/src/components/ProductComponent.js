import React from 'react'



export default function ProductComponent(props) {
  let badgeText
  if (props.openSpots === 0) {
      badgeText = "SOLD OUT"
  } else if (props.location === "Online") {
      badgeText = "ONLINE"
  }
  
  return (
      <div className="card">
          {badgeText && <div className="card--badge">{badgeText}</div>}
          <img src={`../images/${props.img}`} className="card--image" />
          <div className="card--stats">
              
              <span>{props.title}</span>
              
          </div>
          <p className="card--title">{props.description}</p>
          <p className="card--price"><span className="bold">From ${props.price}</span> / person</p>
      </div>
  )
}

import React from 'react'

function ButtonCLock (props) {
  
    return (
      <div id={props.ids}>
        <div>
          <h1 style={{fontSize:'20px'}}>{props.title}</h1>
        </div>
        <div className="button-clock">
          <button 
            className="btn btn-primary" 
            id={props.idUp}
            onClick ={props.clickUp}
          >
            <i class="bi bi-caret-up"></i>
          </button>
            <span id={props.id}>{props.count}</span>
          <button 
            className="btn btn-primary" 
            id={props.idDown}
            onClick={props.clickDown}
            >
            <i class="bi bi-caret-down"></i>
          </button>
        </div>
      </div>
    )
}

export default ButtonCLock

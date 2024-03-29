import React from "react";
import './input.styles.scss';

const InputComponent= ({tag, placeholder, type, onChange, value ,name, style, errorText, viewType, items, onKeyPressEvent}) => {

    if(viewType === "DROP_DOWN"){
        return(
            <div className='custom-input-container' style={style}>
                {
                    tag && <p className='tag'>{tag}</p>
                }
                <select className='custom-input' placeholder={placeholder} onChange={onChange}  value={value} name={name} >
                    {
                        items.map((item) => {
                            return <option value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
        )
    }else if (viewType === "CHECK_BOXES"){
        return(
            <div className='custom-input-container' style={style}>
                {
                    tag && <p className='tag'>{tag}</p>
                }
                
               <div className='check-boxes-container'>
                {
                    items.map((item) => {
                       
                        return (
                           <div className='check-bx' key={item}>
                            <input type='checkbox' name={item} onChange={onChange} checked={value.includes(item)}  />
                            <p className='check-bx-name' >{item}</p>
                           </div>
                        )
                    })
                }
               </div>
                
            </div>
        )
    } else if (viewType === "TEXT_AREA"){
        return(
            <div className='custom-input-container' style={style}>
                {
                    tag && <p className='tag'>{tag}</p>
                }
               
                <textarea onKeyPress={onKeyPressEvent} className='custom-input text-area' placeholder={placeholder} type={type} onChange={onChange}  value={value} name={name} />
                {
                    errorText?
                    <p className='error-text'>{errorText}</p>
                    :
                    null
                }
            </div>
        )
        
    } 
    else {
        return(
            <div className='custom-input-container' style={style}>
                {
                    tag && <p className='tag'>{tag}</p>
                }
               
                <input onKeyPress={onKeyPressEvent} className='custom-input' placeholder={placeholder} type={type} onChange={onChange}  value={value} name={name} />
                {
                    errorText?
                    <p className='error-text'>{errorText}</p>
                    :
                    null
                }
            </div>
        )
    }
    
   
}

export default InputComponent;
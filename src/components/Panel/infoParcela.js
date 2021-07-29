import React from 'react';
import { connect } from 'react-redux';
import {showBidder} from '../../actions/showBidder'

const formStyle={
    textAlign:"left",
    marginLeft:"5%"
}

const Info = (props)=>{

    const setBidder = () =>{
        props.showBidder(true)
    }

    return(
        <div >
            <div style={formStyle}>
            <label>REFCAT:</label>
            <h3>{props.featuresState.refcat}</h3>
            </div>
            <div style={formStyle}>
            <label>CONTACTO:</label>
            <h3>{props.featuresState.contacto}</h3>
            </div>
            <div style={formStyle}>
            <label>ULTIMA VISITA:</label>
            <h3>{props.featuresState.lastVisit}</h3>
            </div>
            <div style={formStyle}>
            <label>DESCRIPCION:</label>
            <h3>{props.featuresState.description}</h3>
            </div>
            <div style={formStyle}>
            <label>PRECIO DE VENTA:</label>
            <h3>{props.featuresState.price}</h3>
            </div>
            <button onClick={()=>setBidder()}>Comprar</button>
        </div>
    )

}

const mapStateToProps = state => {		
    return {		
        featuresState: state.features,
      }		
}

const mapDispatchToProps = dispatch => {
    return {
		showBidder:(bool)=>dispatch(showBidder(bool))
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);

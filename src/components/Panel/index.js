import React from 'react';
import { connect } from 'react-redux';
import InfoParcela from './infoParcela';
import Bidder from './bidder';

const containerStyle = {
	position: 'absolute',
	top: 0,
	bottom: 0,
    left:"70%",
	height: '100%',
	width: '30%',
    zIndex:2,
    textAlign:"center",
    backgroundColor:"white",
    borderStyle:"solid",
    borderWidth:1
    
};

const forms = (props)=>{
    return(
        <div style={containerStyle}>
            <h3 >INFORMACION BASICA DE PARCELA </h3>
            {props.showBidderState?<Bidder/>:<InfoParcela/>}
        </div>
    )
}

const mapStateToProps = state => {		
    return {		
        showBidderState: state.showBidder.showBidder,
      }		
}

export default connect(mapStateToProps)(forms);
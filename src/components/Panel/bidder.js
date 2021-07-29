import React,{useState} from 'react';
import { connect } from 'react-redux';
import {showPanel} from '../../actions/showPanel'
import Axios from 'axios';

const formStyle={
    display:"flex",
    flexDirection:"column",
    textAlign:"left",
    marginLeft:"5%",
    marginRight:"5%",
    marginBottom:"5%"
}

const currency={
    content:"€",
    left:"5px"
}

const Bidder = (props)=>{
    const [bidderData, setBidderData]=useState({
        name:"",
        phone:"",
        email:"",
        bid:""
    })

    const handleInputChange = (e) =>{
        setBidderData({
            ...bidderData,
            [e.target.name]:e.target.value
        })
    }

    const sendBid = async(e)=>{
        if(bidderData.name===""){
            alert("Ingrese Nombre y Apellido")
            return
        }
        if(bidderData.phone===""){
            alert("Ingrese Numero Telefónico")
            return
        }
        if (!/\S+@\S+\.\S+/.test(bidderData.email)){
            alert( "Debe ingresar un mail valido.\n(Formato: ejemplo@ejemplo.com)")
            e.preventDefault();
            setBidderData({
                ...bidderData,
                email:""
            })
          return
        }
        if(bidderData.bid===""){
            alert("Ingrese Su Oferta")
            return
        }

        e.preventDefault()
        await Axios.post("http://localhost:8000/sales",bidderData)
        .then(res=>{
            alert("Oferta Enviada con Exito")
            props.showPanel(false)
        })
        .catch(err=>{
            alert("No Se Realizo la Oferta. Intente Nuevamente")
            props.showPanel(false)
        })

    }

    return(
        <div>
            <div style={formStyle}>
                <label>NOMBRE Y APELLIDO DEL COMPRADOR:</label>
                <input type="text" name="name" onChange={(e)=>handleInputChange(e)} required/>
            </div>
            <div style={formStyle}>
                <label>TELEFONO:</label>
                <input type="tel" name="phone" onChange={(e)=>handleInputChange(e)} required/>
            </div>
            <div style={formStyle}>
                <label>CORREO ELECTRONICO:</label>
                <input type="email" name="email" onChange={(e)=>handleInputChange(e)} required/>
            </div>
            <div style={formStyle}>
                <label>PRECIO DE COMPRA:</label>
                <span>€
                <input style={currency} type="number" name="bid" onChange={(e)=>handleInputChange(e)} required/>
                </span>
            </div>
            <div>
                <button onClick={(e)=>sendBid(e)}>Comprar</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
		showPanel:(bool)=>dispatch(showPanel(bool)),
      }
}

export default connect(null, mapDispatchToProps)(Bidder);
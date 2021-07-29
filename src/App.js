import React from 'react';
import { connect } from 'react-redux';
import Map from './components/Map';
import Panel from './components/Panel/index'

function App(props) {
  return (
    <div>      
      <Map />
      {props.showPanelState?<Panel/>:null}
    </div>

  );
}

const mapStateToProps = state => {		
  return {		
      showPanelState:state.showPanel.showPanel
    }		
}

export default connect(mapStateToProps)(App);
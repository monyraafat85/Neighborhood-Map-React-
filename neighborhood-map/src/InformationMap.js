import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class InformationMap extends Component {
  componentDidMount() {
    /*http://developer.et4.de/reference/current/ecMaps~eContent.MiniMap~IsMapLoaded.html*/
    window.isMapLoaded = false;
    setTimeout(() => {
      if (!window.isMapLoaded) {
        this.props.onerror();
      }
    }, 9000);
  }

  render() {
    return <div

       className='containerMap'
       style={{marginLeft: '300px'}}>
       <CM
        isMarkerShown={this.props.locations.length > 0}
        googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAAI8vX_aWvDGxvr4WxwONs-Kd4bZ-jS8E&callback'
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        locations={this.props.locations}
        closing_win={this.props.closing_win}
        click_m={this.props.click_m}
      />
    </div>;
  }
}

export default InformationMap ;

let  CM = withScriptjs(withGoogleMap(props => {
    return <GoogleMap
      defaultZoom={10}
      defaultCenter={props.locations.length > 1 ? props.locations[0] : {lat: 37.4220, lng: -122.0841}}
      defaultOptions={{scrollwheel: false}}
      onClick={props.closing_win}
      >
      {props.isMarkerShown && (props.locations.map((Loc, index) =>
        <Marker
          key={index}
          position={Loc}
          animation={Loc.clicked ? window.google.maps.Animation.BOUNCE : 0}
          onClick={() => {props.click_m(index)}} /> ))
      }
    </GoogleMap>
    
  }
))
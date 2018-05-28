import React, { Component } from 'react';
import Information,{ InformationScreen } from './Information';
import InformationMap  from './InformationMap';
import './App.css';



class App extends Component {
  state = {
    locations: []
  }

  constructor(props) {
       super(props);
       this.MarkerHandling = this.MarkerHandling.bind(this);
       this.Click_Marker = this.Click_Marker.bind(this);
       this.closing= this.closing.bind(this);
       this.information = this.information.bind(this);
       this.info = this.info.bind(this);
       this.error = this.info.bind(this);
     }

  MarkerHandling(locations) {
    this.setState({ locations });
  }

  
  Click_Marker(M){
    
    var locations = this.state.locations.map((text, num) => {
      if (num === M) {
        text.clicked = 1;
      } else {
        text.clicked = 0;
      }
      return text;
    });

  
    this.information(this.state.locations[M]).then(v => {
       
        this.setState({
          locations: locations,
          sLocation: v.response.venue
        });
        document.querySelector('.opening_screen').focus();
      }).catch(error => { this.error();
        
      /*https://developer.mozilla.org/en-US/docs/Web/API/Window/alert*/ 
        window.alert(error);});
  }

  info(){
     const locations = this.state.locations.map((text,num ) => {
      text.clicked = 0;
      return text;
    });
    this.setState({ locations: locations, sLocation: null });
  }


  closing(){
   this.info();
  }


  
  information(Loc){
    return (require('react-foursquare')({
                clientID: 'A5YQW02V1ENTLEICYKHP0VSRO5HSFSRWUWQ5C5UDFT4JXBVD',
                clientSecret: '5UOEEYOVPBWLIJ3I22C50NURST4JGNY1ULG43XPIGWTW3NIF'})).venues.getVenue({
                    'venue_id': Loc.id
    })
  }

error(){

    document.querySelector('.e').style.opacity = 1;
    setTimeout(() => {
      document.querySelector('.e').style.opacity = 0;
    }, 2000);
}



  render() {
    return (
      <div className='containerApp'>
        <Information
          f_square={require('react-foursquare')({
                        clientID: 'A5YQW02V1ENTLEICYKHP0VSRO5HSFSRWUWQ5C5UDFT4JXBVD',
                        clientSecret: '5UOEEYOVPBWLIJ3I22C50NURST4JGNY1ULG43XPIGWTW3NIF'})}
          M_setting={this.MarkerHandling}
          Click_place={this.Click_Marker} />


        <InformationMap 
          locations={ this.state.locations.map(v => {
          return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked } })}

          closing_win={this.closing}
          click_m={this.Click_Marker}
           onError={this.error}
           />

        {this.state.sLocation && (<InformationScreen
          Loc={this.state.sLocation}
          f_square={require('react-foursquare')({
                      clientID: 'A5YQW02V1ENTLEICYKHP0VSRO5HSFSRWUWQ5C5UDFT4JXBVD',
                      clientSecret: '5UOEEYOVPBWLIJ3I22C50NURST4JGNY1ULG43XPIGWTW3NIF'})}
          closing_win={this.closing} />)}
         <div className='e'>  OOPS, loading error </div>
      </div>
    );
  }
}

export default App;

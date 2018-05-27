import React, { Component } from 'react';
import Geocode from 'react-geocode';
import escapeRegExp from 'escape-string-regexp';
import Draggable from 'react-draggable';

/* from https://developers.google.com/maps/documentation/javascript/get-api-key*/
Geocode.setApiKey('AIzaSyAAI8vX_aWvDGxvr4WxwONs-Kd4bZ-jS8E');

class Information extends Component {
  state = {
    locations: [],
    q: ''
  }


  constructor(props) {
       super(props);
       this.updating = this.updating.bind(this);
       this.LocFilter = this.LocFilter.bind(this);
       this.In_field = this.In_field.bind(this);
       this.obtaining_loc = this.obtaining_loc.bind(this);
       this.Googleplex = this.Googleplex.bind(this);
     }

Googleplex(){
   Geocode.fromAddress("Googleplex").then(r => {
        const { lat, lng } = r.results[0].geometry.location;
        this.props.f_square.venues.getVenues({
          'll': `${lat},${lng}`,
          'categoryId': '4bf58dd8d48988d116941735'
        }).then(s => {
          const venues = s.response.venues;
          this.props.M_setting(venues);
          this.setState({ locations: venues });
        });
      }
    );
}

  componentDidMount() {
   this.Googleplex();
  }


  updating (q) {
    this.setState({ q }, () => {this.props.M_setting(this.LocFilter());});
  }

  LocFilter() {
    const { q, locations } = this.state;

    while(this.state ==='') {
      return locations;
    }
    return locations.filter(t => new RegExp(escapeRegExp(q), 'i').test(t.name));
  }

  
  In_field() {
    const { q } = this.state;

    return <input  role="search" aria-labelledby="searchbutton" className='filter' type='text' value={q}
      onChange={event => this.updating(event.target.value)} placeholder='Search' />
  }

  obtaining_loc (){
    return (
      <ol className='location' aria-label='Location _list' role='listbox' >
        {this.LocFilter().map((t, num) =>
          <li
            key={num}  tabIndex="-1"  role='option' className='place' onClick={() => {this.props.Click_place(num)}}> {t.name}
          </li>
        )}
      </ol>
    )
  }

  render() {
    return (
      <div>
        <div className='side_Bar'>
          <div className='heading' role='heading' >
            <h1 className='header'>Bart Locations</h1>
            {this.In_field()}
          </div>
          <div className='listOfPlace' role='region'>
            {this.obtaining_loc()}
          </div>
        </div>
        
      </div>
    );
  }
}

/*---------------clase -----------------------*/
class InformationScreen extends Component {
  render() {
    const { Loc } = this.props;

    return (
    <Draggable>
      <article className='opening_screen' >
        <h2 className='loc-name'>{Loc.name}</h2>
        <p className='x_screen' onClick={() => {this.props.closing_win()}} > X Close</p>
        <p className='property'>{Loc.categories[0].name}</p>
        <p className='Addressing'>{Loc.location.address}, {Loc.location.city}</p>
        <p className='rating'>Rating: {Loc.rating} ({Loc.likes.summary})</p>
        
      </article>
    </Draggable>
    )
  }
}



  export default Information;
  export {
    InformationScreen

  }
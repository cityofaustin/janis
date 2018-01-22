import React, {Component} from 'react';

class StaticMap extends Component {

  getLocation() {

    const { street, city, state, zip, latitude, longitude } = this.props.location;
    const defaultLocation = "City Hall, Austin, Texas 78701";

    if (street) {
      return encodeURIComponent(`${street} ${city || "Austin"}, ${ state || "Texas"} ${zip}`);
    }

    if (latitude && longitude) {
      return encodeURIComponent(`${latitude}, ${longitude}`);
    }

    return encodeURIComponent(defaultLocation);
  }

  render() {

    const {title, location} = this.props;

    if(!location) {
      return null;
    }

    const encodedLocation = this.getLocation();

    return (
      <div className="coa-StaticMap">
        <a href={`//www.google.com/maps/place/${encodedLocation}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Opens in new window"
        >
          <img
            src={`//maps.googleapis.com/maps/api/staticmap?markers=${encodedLocation}&zoom=17&size=600x300&scale=1&maptype=roadmap&key=AIzaSyBqtg0ntvqWGSHOznB4kq3DiYSyyVNKzIs`}
            alt={title || "map"}
          />
        </a>
      </div>
    );
  }
}

export default StaticMap;

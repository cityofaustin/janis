import React, { Component } from 'react';
import arrJpg from 'images/arr-dept.jpg';
import bulkItemsJpg from 'images/bulk-items.jpg';
import curbsideCompostJpg from 'images/curbside-compost.jpg';
import curbsidePickupJpg from 'images/curbside-pickup.jpg';
import hazardousWasteJpg from 'images/household-hazardous-waste.jpg';

const imageMap = {
  'dropoff': 'http://lorempixel.com/1440/250/',
  'holiday-tree-recycling': hazardousWasteJpg,
  'residential-bulk-collection': bulkItemsJpg,
  'residential-curbside-collection-schedule': curbsidePickupJpg,
  'learn-how-compost-your-curb': curbsideCompostJpg,
  // 'arr': arrJpg,
}

class Hero extends Component {

  render() {
    const heroImageSrc = imageMap[this.props.page];

    const HeroImageStyles = {
      backgroundImage: `url(${heroImageSrc})`,
    }

    return (
      <div className="coa-Hero--image" style={HeroImageStyles}></div>
    );
  }

}

export default Hero;

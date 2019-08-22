import React, { Component } from 'react';

/**
  Wrapper to create an id for the GuideSidebar's anchorTag to link to.
  Also creates a ref to pass to parent index.js.
  This ref contains information about the rendered component's position.
  We pass the ref's offsetTop to the parent so that the sidebar can know which section is being looked at (based on scrolling behavior).
**/
export default class GuideSectionWrapper extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    this.props.updateSection(this.node.current.offsetTop, this.props.anchorTag)
  }

  componentDidMount() {
    this.props.registerSection(this.node.current.offsetTop, this.props.anchorTag);
    window.addEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <div
        id={this.props.anchorTag}
        ref={this.node}
      >
        {this.props.children}
      </div>
    )
  }
}

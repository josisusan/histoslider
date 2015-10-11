import React, { Component, PropTypes } from 'react'
import arrays from 'd3-arrays'
import s from 'd3-scale'

import Histogram from './Histogram'
import Slider from './Slider'

const histosliderStyle = {
  position: 'relative',
  backgroundColor: '#fafafa'
}

export default class Histoslider extends Component {

  reset () {
    this.props.onChange(null)
  }

  render () {
    const extent = arrays.extent(this.props.data)
    const start = this.props.start >= 0 ? this.props.start : Math.floor(extent[0] / this.props.bucketSize) * this.props.bucketSize
    const end = this.props.end >= 0 ? this.props.end : Math.ceil(extent[1] / this.props.bucketSize) * this.props.bucketSize

    const innerWidth = this.props.width - (this.props.padding * 2)
    const scale = s.linear().domain([start, end]).range([this.props.padding, innerWidth + this.props.padding]).clamp(true)
    let selection = this.props.selection ? this.props.selection : [start, end]
    const selectionSorted = arrays.extent(selection)

    // TODO: selection layer
    return (
      <div style={Object.assign(histosliderStyle, { width: this.props.width })} className='Histoslider Histoslider-wrapper'>
        <Histogram {...Object.assign({}, this.props, { start, end, reset: this.reset.bind(this), extent, selection: selectionSorted, innerWidth, scale, height: this.props.height - 40 })} />
        <Slider {...Object.assign({}, this.props, { start, end, reset: this.reset.bind(this), extent, selection, selectionSorted, scale, innerWidth, height: 50 })} />
      </div>
    )
  }
}

Histoslider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  selectionColor: PropTypes.string,
  bucketSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  selection: PropTypes.arrayOf(PropTypes.number),
  histogramHeight: PropTypes.number,
  histogramPadding: PropTypes.number,
  histogramVisible: PropTypes.bool,
  style: PropTypes.object
}

Histoslider.defaultProps = {
  bucketSize: 1,
  selectionColor: '#2ecc71',
  histogramVisible: true,
  histogramPadding: 4,
  padding: 20,
  width: 400,
  height: 200,
  style: {
    border: '1px solid red'
  }
}
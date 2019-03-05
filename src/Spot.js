import { render, Component } from 'inferno';

class Spot extends Component {

  constructor(props) {
    super(props);

    let posLeft = 0;
    let posRight = 160;

    this.state = {
      beatCount: 0,
      inlineStyle: {
        left: ( props.position == 'left' ) ? props.distance + 'px' : 'auto',
        right:( props.position == 'right' ) ? props.distance + 'px' : 'auto'
      },
      spotPosition: '20,0 ' + posLeft + ',100 ' + posRight + ',100',
      spotColor: 'rgba( 0, 255, 0, 0.4)',
      colorValues: ['rgba( 255, 0, 0, 0.4)', 'rgba( 0, 0, 255, 0.4)']
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.beat != nextProps.beat ) {
      this.changeStyle();
    }
  }

  changeStyle() {
    const component = this;

    let beatCountNew = component.state.beatCount + 1,
        oldValue = component.state.spotColor,
        colorValues = component.state.colorValues,
        nextIndex = Math.floor( Math.random() * (colorValues.length ) ),
        newValue = colorValues[nextIndex],
        newPosition = 20 + Math.floor(Math.random() * 200 );

    if ( beatCountNew == 2 ) {
      colorValues.splice( nextIndex, 1);
      colorValues.push(oldValue);

      component.setState({
        beatCount: 0,
        colorValues: colorValues,
        spotColor: newValue,
        spotPosition: '20,0 ' + newPosition + ',100 ' + ( newPosition + 240 ) + ',100'
      });
    } else {
      component.setState({
        beatCount: beatCountNew
      });
    }
  }

  render() {
    return (
      <div className={ 'spot' + ( this.props.dancing ? '' : ' spot--hidden') } style={this.state.inlineStyle}>
        <svg xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:ev="http://www.w3.org/2001/xml-events"
           height="100%"
           preserveAspectRatio="none"
           viewBox="0 0 400 100"
           width="100%">
           <polygon fill={this.state.spotColor} points={this.state.spotPosition}/>
        </svg>
      </div>
    );
  }
}

export {Spot};

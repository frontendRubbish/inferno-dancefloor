import { render, Component } from 'inferno';

class Dancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inlineStyle: {
        bottom: props.bottomPos + 'px',
        left: props.leftPos + 'px'
      },
      gotJump : false,
      moveValues: [90, 180],
      drunkenness: Math.floor(Math.random() * (5) + 1),
      jumpLatency: 0,
      beatCount: 0,
      jumpCounter: 0,
      headPosition: 'translate(0, 0 )',
      armLeftPosition: 'rotate(0 52,167)',
      armRightPosition: 'rotate(0 108,167)',
      animations: {
        head: {
          current: 0,
          target: 0
        },
        jump: {
          current: 0,
          target: 0
        },
        rotation: {
          current: 0,
          target: 0
        }
      }
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.beat != nextProps.beat ) {
      this.changeStyle();
    }

    if ( this.props.tick != nextProps.tick ) {
      this.checkUpdateAnimation();
    }
  }

  checkUpdateAnimation() {
    if ( this.props.jumping && this.state.gotJump ) {
      this.moveBodyPart( this, 'jump', 0.6, true );
    } else {
      this.moveBodyPart( this, 'rotation', 0.4, false );
      this.moveBodyPart( this, 'head', 0.4, false );
    }
  }

  moveBodyPart( component, currentStatus, easing, jump ) {
    let animations = this.state.animations,
        status = animations[currentStatus],
        newValue = status.current,
        targetValue = status.target,
        diff = Math.abs( targetValue - newValue);

    if ( diff < 0.1 ) {
      newValue = targetValue;
    } else if ( newValue < targetValue ) {
      newValue = newValue + (easing * diff );
    } else if ( newValue > targetValue ) {
      newValue = newValue - (easing * diff );
    }

    animations[currentStatus].current = newValue;
    if (jump && ( diff < 0.1 ) ) {
      animations[currentStatus].target = ( animations[currentStatus].target == 0 ) ? 40 : 0;
    }
    this.setState({animations: animations,
      headPosition : 'translate(0, ' + animations['head'].current +')',
      armLeftPosition: 'rotate(' + animations['rotation'].current + ' 52,167)',
      armRightPosition: 'rotate(-' + animations['rotation'].current + ' 108,167)',
      inlineStyle: {
        bottom: ( this.props.bottomPos + animations['jump'].current ) + 'px',
        left: this.props.leftPos + 'px'
      },
    });
  }

  changeStyle() {
    let beatCount = this.state.beatCount,
        moveValues = this.state.moveValues,
        jumpLatency = this.state.jumpLatency,
        animations = this.state.animations,
        oldValue = animations['rotation'].target,
        nextIndex = Math.floor( Math.random() * (moveValues.length) ),
        newValue = moveValues[nextIndex];


    beatCount++;

    if ( this.props.jumping ) {
      jumpLatency ++;

      this.setState({
        jumpLatency: jumpLatency,
        gotJump: ( jumpLatency >= this.state.drunkenness )
      });

    } else {
      this.setState({
        gotJump: false,
        jumpLatency: 0
      });
    }

    if ( beatCount == 2 ) {
      moveValues.splice( nextIndex, 1);
      moveValues.push(oldValue);

      this.setState({
        beatCount: 0,
        moveValues: moveValues
      });
      animations['rotation'].target = newValue;
      animations['head'].target = 0;
    } else {
      this.setState({
        beatCount: beatCount
      });
      animations['head'].target = 10;
    }
    this.setState({animations: animations});
  }

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:ev="http://www.w3.org/2001/xml-events"
         class="dancer"
         height="300"
         width="160"
         style={this.state.inlineStyle}>
        <ellipse cx="80" cy="198" rx="46" ry="54" fill="white" stroke="black" stroke-width="3" />
       <g transform={this.state.headPosition}>
          <ellipse cx="61" cy="50" rx="16" ry="40" fill="white" stroke="black" stroke-width="3" />
          <ellipse cx="100" cy="50" rx="16" ry="40" fill="white" stroke="black" stroke-width="3" />
          <circle cx="80" cy="110" r="40" stroke="black" stroke-width="3" fill="white" />
          <circle cx="70" cy="100" r="8" stroke="black" stroke-width="3" fill="black" />
          <circle cx="90" cy="100" r="8" stroke="black" stroke-width="3" fill="black" />
        </g>

        <ellipse cx="52" cy="186" rx="16" ry="30" fill="white" stroke="black" stroke-width="3" transform={this.state.armLeftPosition} />
        <ellipse cx="108" cy="186" rx="16" ry="30" fill="white" stroke="black" stroke-width="3" transform={this.state.armRightPosition}/>

        <circle cx="60" cy="244" r="16" stroke="black" stroke-width="3" fill="white" />
        <circle cx="100" cy="244" r="16" stroke="black" stroke-width="3" fill="white" />
      </svg>
    );
  }
}

export {Dancer};

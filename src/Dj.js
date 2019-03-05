import { linkEvent, render, Component } from 'inferno';

function triggerJump( instance, event ) {
  let animations = instance.state.animations;

  instance.props.onStartJump();
  animations['rotation'].target = 160;

  instance.setState({
    animations: animations,
    jumpCounter: 0
  });
}

class Dj extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beatCount: 0,
      drunkenness : Math.floor(Math.random() * (5) + 1),
      jumpCounter: 0,
      headPosition: 'translate(0, 0 )',
      armPosition: 'rotate(0 52,167)',
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
    this.moveBodyPart( this, 'rotation', 0.4, false );
    this.moveBodyPart( this, 'head', 0.4, false );
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
      armPosition: 'rotate(' + animations['rotation'].current + ' 52,167)'
    });
  }

  changeStyle() {

    let beatCount = this.state.beatCount,
        jumpCounter = this.state.jumpCounter,
        animations = this.state.animations;

    beatCount++;

    this.setState({
      beatCount: ( beatCount == 2 ) ? 0 : beatCount
    });

    animations['head'].target = ( beatCount == 2 ) ? 0 : 10;

    if ( this.props.jumping && !this.props.riot ) {

      jumpCounter++;

      if ( jumpCounter == 17 ) {
          this.props.onStopJump();
          animations['rotation'].target = 0;
      } else {
        this.setState({ jumpCounter: jumpCounter });
      }
    }
    this.setState({animations: animations });
  }

  render() {
    return (
      <div class="dj">
        <div class="dj__button" onClick={ linkEvent(this, triggerJump ) }></div>
        <div className={'dj__bunny' + ( this.props.dancing ? '' : ' dj__bunny--hidden') }>
          <svg xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:ev="http://www.w3.org/2001/xml-events"
             height="300"
             width="160">
             <ellipse cx="80" cy="198" rx="46" ry="54" fill="white" stroke="black" stroke-width="3" />
               <g transform={this.state.headPosition}>
                 <ellipse cx="60" cy="50" rx="16" ry="40" fill="white" stroke="black" stroke-width="3" />
                 <ellipse cx="100" cy="50" rx="16" ry="40" fill="white" stroke="black" stroke-width="3" />
                 <circle cx="80" cy="110" r="40" stroke="black" stroke-width="3" fill="white" />
                 <circle cx="70" cy="100" r="8" stroke="black" stroke-width="3" fill="black" />
                 <circle cx="90" cy="100" r="8" stroke="black" stroke-width="3" fill="black" />
               </g>

               <ellipse cx="52" cy="186" rx="16" ry="30" fill="white" stroke="black" stroke-width="3" transform={this.state.armPosition} />
               <ellipse cx="108" cy="186" rx="16" ry="30" fill="white" stroke="black" stroke-width="3" />

               <circle cx="60" cy="244" r="16" stroke="black" stroke-width="3" fill="white" />
               <circle cx="100" cy="244" r="16" stroke="black" stroke-width="3" fill="white" />
          </svg>

          <div className={'dj__bubble' + ( this.props.jumping ? ' dj__bubble--visible' : '')}>
            <span class="dj__text dj__text--large">Jump</span>
            <span class="dj__text">you</span>
            <span class="dj__text dj__text--large">FUCKERS!!!</span>
          </div>
          <div class="dj__board">
          </div>
        </div>
      </div>
    );
  }
}

export {Dj};

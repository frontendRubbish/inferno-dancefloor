import { render, Component } from 'inferno';
import {Dj} from './Dj';
import {Dancer} from './Dancer';
import {StartButton} from './StartButton';
import {Spot} from './Spot';

class Dancefloor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danceRows: this.createDancers(),
      dancing: false,
      beat: false,
      speed: 4.4,
      jumping: false,
      tick: false,
      riot: false
    };
  }

  componentDidMount() {
    const component = this,
          fpsInterval = 1000/60;

    let   beatThen = Date.now(),
          beatLoop = () => {
            requestAnimationFrame(beatLoop);
            let now = Date.now(),
                delta = now - beatThen,
                beatInterval = component.getBeatInterval();

            if (delta > beatInterval) {
              let beat = component.state.beat;
              beatThen = now - (delta % beatInterval);

              if ( component.state.dancing ) {
                component.setState({
                  beat: !beat
                });
              }
           }
          },

          then = Date.now(),
          animationLoop = () => {
           requestAnimationFrame(animationLoop);
           let now = Date.now(),
               delta = now - then;

           if (delta > fpsInterval) {
             let tick = component.state.tick;
              then = now - (delta % fpsInterval);
              if ( component.state.dancing ) {
                component.setState({
                  tick: !tick
                });
              }
           }
         };
    //Start Loops for Bunnies
    animationLoop();
    beatLoop();
  }
  stopDancing() {
    this.setState({ dancing: false, speed: 4.4, riot: false});
  }

  getBeatInterval() {
    return 1000 / this.state.speed
  }

  onStartRiot() {
    this.setState({
      dancing: true,
      jumping: true,
      riot: true,
      speed: 40
    });
  }

  onStartSong() {
    this.setState({
      dancing: true,
      jumping: false
    });
  }

  startJump() {
    this.setState({
      jumping: true
    });
  }

  stopJump() {
    this.setState({
      jumping: false
    });
  }

  render() {
    let dancers = this.state.danceRows.map( row => {
        return row.map( ( dancer, index ) => {
            return <Dancer key={index} beat={this.state.beat} jumping={this.state.jumping} tick={this.state.tick} bottomPos={dancer.bottomPos} leftPos={dancer.leftPos} />
        });
      });
    return (
      <div className={ 'dancefloor ' + ( this.state.dancing ? 'dancefloor--dark' : '') }>
      <Dj tick={this.state.tick} beat={this.state.beat} jumping={this.state.jumping} dancing={this.state.dancing} riot={this.state.riot}
          onStartJump={ e => this.startJump() } onStopJump={ e => this.stopJump() } />

        <StartButton onStartSong={ e => this.onStartSong(e) } onStartRiot={ e => this.onStartRiot(e) } dancing={this.state.dancing}/>
          { dancers }
        <Spot beat={this.state.beat} dancing={this.state.dancing} position="left" distance="60"/>
        <Spot beat={this.state.beat} dancing={this.state.dancing} position="left" distance="340"/>
        <Spot beat={this.state.beat} dancing={this.state.dancing} position="right" distance="60"/>
        <Spot beat={this.state.beat} dancing={this.state.dancing} position="right" distance="340"/>
      </div>
    );
  }

  createDancers() {
    let dancerInRow = window.innerWidth / 100,
        rowArray = [];

    for (let rowIdx= 0;rowIdx < 3;rowIdx++) {
      let row = [];
      for (let idx = 0;idx < dancerInRow;idx++) {
        row.push( {
            leftPos : (idx * 86 ) + Math.floor(Math.random() * (30 + 0) - 0 ),
            bottomPos: ( (3 - rowIdx ) * 70 ) + Math.floor(Math.random() * (10 + 10) ) - 60
        });
      }
      rowArray.push(row);
    }

    return rowArray;
  }

}

export {Dancefloor};

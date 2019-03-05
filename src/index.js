import { render } from 'inferno';
import {Dancefloor} from './Dancefloor';
import './sass/main.scss';

render(
  <Dancefloor ref={(dancefloorComponent) => {window.app = dancefloorComponent}} />,
  document.getElementById("widget")
);

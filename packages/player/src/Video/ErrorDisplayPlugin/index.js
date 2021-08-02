import videojs from 'video.js';
import { STATUS_DESCRIPTION } from '../constants';

const ErrorDisplay = videojs.getComponent('ErrorDisplay');
const Component = videojs.getComponent('Component');

class MyErrorDisplay extends ErrorDisplay {
  constructor(player, options) {
    super(player, options);
    this.on(player, 'error', this.open);
  }

  content() {
    const error = this.player().error();
    return error ? STATUS_DESCRIPTION.error : '';
  }

  buildCSSClass() {
    return `vjs-error-display vjs-my-error-display ${super.buildCSSClass()}`;
  }
}

Component.registerComponent('MyErrorDisplay', MyErrorDisplay);
export default MyErrorDisplay;

/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import videojs from 'video.js';
import moment from 'moment';
import { getDefaultDuration } from '../utils';
import { formatDuration } from '../../utils';

const TimeDisplay = videojs.getComponent('TimeDisplay');
const Component = videojs.getComponent('Component');

/**
 * Displays the duration
 *
 * @extends Component
 */
class MyDurationDisplay extends TimeDisplay {
  /**
   * Creates an instance of this class.
   *
   * @param {Player} player The `Player` that this class should be attached to.
   * @param {Object} [options] The key/value store of player options.
   */
  constructor(player, options) {
    super(player, options);

    this.on(player, 'ready', () => {
      const qualityLevels = this.player_?.options_?.qualityLevels || [];
      const defaultDuration = getDefaultDuration(qualityLevels);
      this.updateTextNode_(defaultDuration);
    });

    this.on(player, 'timeupdate', () => this.updateTextNode_());

    this.on(player, 'durationchange', this.updateContent);
  }

  /**
   * Builds the default DOM `className`.
   *
   * @returns {string} The DOM `className` for this object.
   */
  buildCSSClass() {
    return 'vjs-duration';
  }

  /**
   * Update duration time display.
   *
   * @param {EventTarget~Event} [event] The `durationchange`, `timeupdate`, or `loadedmetadata`
   *     event that caused
   *     this function to be called.
   * @listens Player#durationchange
   * @listens Player#timeupdate
   * @listens Player#loadedmetadata
   */
  updateContent() {
    const duration = this.player_.duration();

    if (Number.isNaN(duration)) return;

    this.updateTextNode_(duration);
  }

  /**
   * Updates the time display text node with a new time
   *
   * @private
   *
   * @param {number} [total] The time to update to Default is `0`
   */
  updateTextNode_(total = 0) {
    const dur = total || this.player_.duration();
    const duration = dur === -1 ? 'xx:xx:xx' : formatDuration(moment.duration(dur, 'seconds'));

    let cur;

    if (this.player_.ended()) {
      cur = this.player_.duration();
    } else {
      cur = this.player_.scrubbing()
        ? this.player_.getCache().currentTime
        : this.player_.currentTime();
    }

    const currentTime = formatDuration(moment.duration(cur, 'seconds'));

    const time = `${currentTime} / ${duration}`;

    if (this.formattedTime_ === time) {
      return;
    }

    this.formattedTime_ = time;

    this.requestNamedAnimationFrame('TimeDisplay#updateTextNode_', () => {
      if (!this.contentEl_) {
        return;
      }

      const oldNode = this.textNode_;

      this.textNode_ = document.createTextNode(this.formattedTime_);

      if (!this.textNode_) {
        return;
      }

      if (oldNode) {
        this.contentEl_.replaceChild(this.textNode_, oldNode);
      } else {
        this.contentEl_.appendChild(this.textNode_);
      }
    });
  }
}

/**
 * The text that is added to the `MyDurationDisplay` for screen reader users.
 *
 * @private
 *
 * @type {string}
 */
MyDurationDisplay.prototype.labelText_ = 'MyDurationDisplay';

/**
 * The text that should display over the `MyDurationDisplay`s controls. Added to for localization.
 *
 * @private
 *
 * @deprecated In v7; controlText_ is not used in non-active display Components
 * @type {string}
 */
MyDurationDisplay.prototype.controlText_ = 'MyDurationDisplay';

Component.registerComponent('MyDurationDisplay', MyDurationDisplay);
export default MyDurationDisplay;

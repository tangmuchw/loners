/** 基于 videojs-quality-selector-plugin 封装的清晰度切换器 */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');
const Menu = videojs.getComponent('Menu');
const MenuButton = videojs.getComponent('MenuButton');
const MenuItem = videojs.getComponent('MenuItem');

// Default options for the plugin.
const defaults = {};

/** Video quality item. */
class VideoQualityItem extends MenuItem {
  constructor(player, options) {
    super(player, options);
    this.updateSelectMenu = options.updateSelectMenu;
  }

  handleClick() {
    this.updateSelectMenu(this.options_.identify);
    this.player().qualitySelector().changeVideoQuality(this.options_.identify);
  }
}

class QualityMenu extends Menu {
  constructor(player, options) {
    super(player, options);
  }
}

class QualitySelectorMenuButton extends MenuButton {
  constructor(player, options) {
    super(player, options);
    this.addClass('vjs-quality-selector-menu');
    this.bindUpdateSelectMenu = this.updateSelectMenu.bind(this);
    this.createItems();
  }

  updateSelectMenu(identify) {
    const player = this.player();
    const qualityLevels = player.options_.qualityLevels || [];

    const menuItems = this.children()[1].children();

    for (const [index, level] of qualityLevels.entries()) {
      if (menuItems[index].el().classList.contains('vjs-selected')) {
        menuItems[index].el().classList.remove('vjs-selected');
      }

      if (level.identify === identify) {
        this.el().getElementsByClassName('vjs-quality-selector-btn')[0].textContent = level.label;
        menuItems[index].el().classList.add('vjs-selected');
      }
    }

    this.menu.hide();
  }

  createMenu() {
    const menu = new QualityMenu(this.player, this.options_);
    const player = this.player();
    const qualityLevels = player.options_.qualityLevels || [];

    let hasAuto = false;
    let fallbackItem = null;

    for (const item of qualityLevels) {
      if (item.label === 'auto') {
        hasAuto = true;
        break;
      } else if (!fallbackItem && item.selected) {
        fallbackItem = item;
      }
    }

    if (!fallbackItem) {
      fallbackItem = qualityLevels[qualityLevels.length - 1];
    }

    qualityLevels.forEach((item) => {
      const menuItem = new VideoQualityItem(player, {
        label: item.label,
        identify: item.identify,
        updateSelectMenu: videojs.bind(this, this.updateSelectMenu),
      });

      if (hasAuto) {
        this.el().innerHTML = `<span class='vjs-quality-selector-btn'>${item.label}</span>`;
        if (player.currentSrc().length === 0) {
          player.src(item.src);
        }
        menuItem.addClass('vjs-selected');
      } else if (item.selected && item.src === fallbackItem.src) {
        // fix: don not show menu
        const ele = document.createElement('div');
        ele.innerHTML = fallbackItem.label;
        ele.className = 'vjs-quality-selector-btn';
        this.el().insertBefore(ele, this.el().firstChild);

        if (player.currentSrc().length === 0) {
          player.src(fallbackItem.src);
        }
        menuItem.addClass('vjs-selected');
      }
      menu.addItem(menuItem);
    });

    return menu;
  }
}

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class QualitySelector extends Plugin {
  /**
   * Create a QualitySelector plugin instance.
   *
   * @param {Player} player A Video.js Player instance.
   * @param {Object} [options] An optional options object.
   *
   *     While not a core part of the Video.js plugin architecture, a
   *     second argument of options is a convenient way to accept inputs
   *     from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.addClass('vjs-quality-selector');
      this.player
        .getChild('controlBar')
        .addChild('qualityMenuButton', {}, this.player.children().length - 1);
    });
  }

  /** Change video quality. */
  changeVideoQuality(identify) {
    const { player } = this;
    const currentPlayAt = player.currentTime();
    const qualityAry = player.options_.qualityLevels || [];

    if (!qualityAry.length) return;

    const { src } = qualityAry.find(({ identify: level }) => level === identify) || {};

    if (src && player.currentSrc() !== src) {
      player.src({
        src,
      });
      player.load();
      player.currentTime(currentPlayAt);
      if (!player.ended()) {
        player.play();
      }
    }
  }
}

// Define default values for the plugin's `state` object here.
QualitySelector.defaultState = {};

// Include the version number.
QualitySelector.VERSION = '1.0.0';

// Register menu button.
videojs.registerComponent('qualityMenuButton', QualitySelectorMenuButton);

// Register the plugin with video.js.
videojs.registerPlugin('qualitySelector', QualitySelector);

export default QualitySelector;

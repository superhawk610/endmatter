const HtmlWebpackPlugin = require('html-webpack-plugin');

/** Config should include `name`, `author`, and `description`. */
class TwineFormatPlugin {
  static name = 'TwineFormatPlugin';

  static defaultConfig = {
    version: '0.0.1',
    proofing: false,
  };

  constructor(config) {
    this.config = { ...TwineFormatPlugin.defaultConfig, ...config };
  }

  apply(compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;
    const pluginName = TwineFormatPlugin.name;

    compiler.hooks.compilation.tap(pluginName, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
        pluginName,
        data => {
          // generate a Twine `format.js` file and output it
          const format = { ...this.config, source: data.html };
          const json = JSON.stringify(format, null, 2);
          const contents = `window.storyFormat(${json})`;

          // emit file
          compilation.emitAsset('format.js', new RawSource(contents));
        }
      );
    });
  }
}

module.exports = TwineFormatPlugin;

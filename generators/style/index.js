'use strict';

var yeoman = require('yeoman-generator');
var fs     = require('fs');

module.exports = class extends yeoman {
  constructor(args, opts) {
    super(args, opts);

    this.option('partial');

    this.pre = (this.options.partial ? "_" : "");
  }

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'style_name',
      message : 'Style name',
      default : 'style'
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    var n_styles = fs.readdirSync("./src/sass").length;

    if (n_styles <= 9) {
      n_styles = "0" + n_styles;
    }

    if (this.props.style_name == 'style') {
      this.props.style_name = n_styles + "-style";
    }
    
    this.fs.copyTpl(
      this.templatePath('style.scss'),
      this.destinationPath('src/sass/' 
                           + this.pre
                           + this.props.style_name 
                           + '.scss')
    )

    if (this.options.partial) {
      fs.appendFileSync('src/sass/main.scss', '\n@import \'' + this.props.style_name + '\';');
    }
  }
};
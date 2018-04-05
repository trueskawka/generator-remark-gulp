'use strict';

var yeoman = require('yeoman-generator');
var fs     = require('fs');

module.exports = class extends yeoman {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'slide_name',
      message : 'Slide name',
      default : 'slide'
    }]).then((answers) => {
      this.props = answers;
    });
  }

  writing() {
    var n_slides = fs.readdirSync("./src/slides").length;

    if (n_slides <= 9) {
      n_slides = "0" + n_slides;
    } 
    
    this.fs.copyTpl(
      this.templatePath('slide.md'),
      this.destinationPath('src/slides/' 
                           + n_slides 
                           + "-" 
                           + this.props.slide_name 
                           + '.md'),
      { slide_name : this.props.slide_name }
    )
  }
};
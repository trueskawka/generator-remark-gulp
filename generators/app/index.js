'use strict';

var yeoman = require('yeoman-generator');

module.exports = class extends yeoman {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'title',
      message : 'Your presentation title',
      default : 'My awesome presentation is awesome'
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Author name',
      default : 'Awesome author'
    }]);
  }

  writing() {
    // copy remark.js
    this.fs.copy(
      this.templatePath('presentation/js/*'),
      this.destinationPath('presentation/js/')
    );

    // copy styles
    this.fs.copy(
      this.templatePath('src/sass/*'),
      this.destinationPath('src/sass/')
    );

    // copy /slides
    this.fs.copy(
      this.templatePath('src/slides/*'),
      this.destinationPath('src/slides/')
    )

    // copy index.nunjucks
    this.fs.copy(
      this.templatePath('src/index.nunjucks'),
      this.destinationPath('src/index.nunjucks')
    )

    // copy gulpfile.js
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    )

    // copy .gitignore
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    )

    // copy meta.json
    this.fs.copyTpl(
      this.templatePath('src/meta.json'),
      this.destinationPath('src/meta.json'),
      { title  : this.props.title,
        author : this.props.author }
    )

    // copy README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { title : this.props.title }
    )

    // copy license.txt
    this.fs.copyTpl(
      this.templatePath('license.txt'),
      this.destinationPath('license.txt'),
      { author : this.props.author }
    )

    // copy package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { name   : this.props.name,
        author : this.props.author,
        title  : this.props.title }
    )
  }
};
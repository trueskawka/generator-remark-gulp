## Remark.js generator with Gulp and Nunjucks

This is a simple Yeoman generator for [remark](https://remarkjs.com/) -
a web-based presentation tool.

It allows for creating a simple scaffold, where each slide is a separate Markdown file.

### How to install

#### Prerequisites

1. Install [npm](https://www.npmjs.com/get-npm)
2. Install [Yeoman](http://yeoman.io/learning/index.html)
3. Clone this repository and `cd` into it, then run `npm install`
4. Run `npm link` to use the generator locally

#### Creating a new presentation

1. Create a new folder for your presentation outside of the generator directory and `cd` into it 
2. Run `yo remark-gulp` and answer a few questions - the files will be generated
3. Run `npm install` (or `yarn install`)
4. Run `gulp` and go to `localhost:8000`

### How to use

When you run `gulp`, the presentation files will be generated in the 
`presentation` directory. Every time you add or edit a slide, it will
update the file, so just reload it in the broswer. When you're happy with
your presentation, copy all the files in the `presentation` directory and
use `index.html` as your main presentation file (or keep using `gulp`, or 
serve it from your server etc.).

####  Add new slides 
Create a new `.md` file to the `src/slides` directory. As the slides are 
added to the presentation in order, it's best to give them sensible names, 
e.g. `01-title.md`, `02-agenda.md`.

#### Add new CSS styles
Either edit the `src/sass/main.scss` directly or:
- add a partial file `src/sass/_<name>.scss` (mind the underscore) and 
  include it in your `main.scss`
- add a new `src/sass/<name>.scss` file and then include it in the relevant
  slide `.md` file

### Notes

1. I mainly created this scaffold to easily generate presentations for    
  myself. I prefer to have the slides in separate files, but you could just 
  write everything in one big `.md` file and put it in the `src/slides` 
  folder. 

2. As I don't like to use slide counts, I added some CSS to `main.scss`
  you might want to remove, namely:

    ```
    .remark-slide-number {
      display: none;
    }
    ```

    Also, the `.inverse` style that you can see on the main remark website
    was missing from the source file, so I added it to the `main.scss`:

    ```
    .inverse {
      background: #272822;
      color: #777872;
      text-shadow: 0 0 20px #333;
    }

    .inverse h1, .inverse h2 {
      color: #f3f3f3;
      line-height: 0.8em;
    }
    ```

    All the other CSS code is taken directly from the remark project.

3. This is a setup that should work locally, so I just copied the latest
  `remark.min.js`. If you'd rather link to the latest file, change this
  line in `src/index.nunjucks`:

    ```
    <script src="./js/remark.js"></script>
    ```
    to

    ```
    <script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
    ```

### To-do

1. Generator for a new slide
2. Generator for a new `.sass` file
3. Adding the generator to offical Yeoman generators
4. Automatically updating with the latest version of Remark.js
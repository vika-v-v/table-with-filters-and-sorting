#Table with filter and sorting on angular
This repository contains the ready-to-use table with filter and sorting from the <a href="https://github.com/vika-v-v/trading-app-frontend">trading app project</a> written in Angular. There is a demo showing the light and the dark themes of the table with some example data.

#Get Started
Prerequisites: Node.js and Angular must be installed.
<ol>
<li>Clone this project.</li>
<li>Open the terminal and navigate to the project root.</li>
<li>Run <code>npm i</code> (npm install) to install the necessary node modules.</li>
<li>Run <code>ng s</code> (ng serve) to start the application.</li>
<li>Open http://localhost:4200/ in your browser.</li>
</ol>

You will see the demo-app containing two tables with example data. You can now test it or change some data in it. In order to use the table in your project you will need to import the component <a href="src\app\table">table</a> and you is as in the demo example shown. If you also would like to have the same font, you also need to import <a href="src\assets\fonts\gully"> the 'gully' folder from assets</a> and register the font in your <a href="src\styles.css">styles.css</a> file like this:
<pre>
@font-face {
  font-family: 'Gully';
  src: url('assets/fonts/gully/Gully-Regular.otf') format('opentype');
}
</pre>

You can find the example usage of the table in the component <a href="src\app\demo">demo</a>, to change the data insert your own one in <a href="src\app\demo\demo.component.ts">demo.component.ts</a>, to change the tables theme, positioning, size and so on, use <a href="src\app\demo\demo.component.css">demo.component.css</a> and <a href="src\app\demo\demo.component.html">demo.component.html</a>. You will find the detailed explanation as to how the tables work in the section 'Code Structure' below.

# Customizing the table
Changing the text filter to object filter and back

## Adding the theme

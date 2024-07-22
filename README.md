#Table with filter and sorting on angular

#Get Started
Prerequisites: Node.js and Angular must be installed.
<ol>
<li>Clone this project.</li>
<li>Open the terminal and navigate to the project root.</li>
<li>Run <code>npm i</code> (npm install) to install the necessary node modules.</li>
<li>Run <code>ng s</code> (ng serve) to start the application.</li>
<li>Open http://localhost:4200/ in your browser.</li>
</ol>
You will see the demo-app containing two tables: in light mode and in dark mode. You can now test it or change some data in it. In order to use the table in your project you will need to import the component <a href="src\app\table">table</a>. The tables are used in the component <a href="src\app\demo">demo</a>, to change the data insert your own one in <a href="src\app\demo\demo.component.ts">demo.component.ts</a>, to change the tables theme/positioning/..., use <a href="src\app\demo\demo.component.css">demo.component.css</a> and <a href="src\app\demo\demo.component.html">demo.component.html</a>. You will find the detailed explanation as to how the tables work in the section 'Code Structure' below.

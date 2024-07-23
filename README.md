#Table with filters and sorting on angular
This repository contains the ready-to-use table with filter and sorting from the <a href="https://github.com/vika-v-v/trading-app-frontend">trading app project</a> written in Angular. There is a demo showing the light and the dark themes of the table with some example data.

<img src="src\assets\preview\demo_normal.png" alt="Demo">
<img src="src\assets\preview\demo_filter_shown.png" alt="Demo">

Demo:
<a href="https://youtu.be/9qGOSBP4Bjg?si=8xCyDKF8YdxDaW4W?autoplay=1"><img src="src\assets\preview\demo_video.png" alt="Demo"></a>

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

You can find the example usage of the table in the component <a href="src\app\demo">demo</a>, to change the data insert your own one in <a href="src\app\demo\demo.component.ts">demo.component.ts</a>, to change the tables theme, positioning, size and so on, use <a href="src\app\demo\demo.component.css">demo.component.css</a> and <a href="src\app\demo\demo.component.html">demo.component.html</a>.

# Table parameters
Table takes such data as parameters:
<ul>
<li><code>tableHeader</code> - in format <code>
  [{ "value": "Name of the Column", "type": Type_Of_The_Data_In_The_Column },
  { ... },
  ...
  ];</code>. The Types are listed in <a href="src\app\table\filter-type.enum.ts">filter-type.enum</a> and could be:
  <ul>
    <li>Number - Slider as a filter is shown</li>
    <li>Decimal - Slider with decimal values as a filter is shown</li>
    <li>Text - Search field as a filter is shown</li>
    <li>Date - Dropdown with "All periods", "Today", "Yesterday", "This week", "This month", "This year"-values as a filter is shown</li>
    <li>Object - List with checkboxes is shown as a filter respresenting any unique value in the column</li>
  </ul> 
  </li>
  <li>
  <code>tableData</code> - in format <code>[["value for column", "...", ...], [...], ...]</code> is an array of arrays, each inner array representing the row in a table and values in it should match to the header structure provided in <code>tableHeader</code>. See <a href="src\app\demo">demo</a> for the example usage. If no data provided the message 'Not yet available.' will be shown instead of the table. You can change this message using "errorEmpty" parameter.
  </li>
  <li><i>[optional]</i> <code>errorEmpty</code> - the message shown if no <code>tableData</code> provided. By default is 'Not yet available.', but can be changed to any value.</li>
  <li><i>[optional]</i> <code>name</code> - the title of the table shown at the top left of the table. By default is not shown, but can be added.</li>
  <li><i>[optional]</i> <code>theme</code> - what theme is used: can have values <code>light</code> and <code>dark</code>, by default is <code>light</code>. Adding custom theme is described in "Adding the theme" section.</li>
</ul>

# Customizing the table
This section explains how to futher customize the table - change the filters used with specified filer types, names and keys of the sortings. If you take any changes, all table instances generated with this component will be affected.

The configuration of the table is specified in the file <a href="src\app\table\table-config.const.ts">table-config.const.ts</a>. It is an array of Objects, each Object containing an own filter type. Filter types are listed in <a href="src\app\table\filter-type.enum.ts">filter-type.enum.ts</a>. Each Filter Type has Sortings and Filters. Sortings contain name (can be anything), key (currently asc - ascending and desc - descending implemented, but futher may be added) and icon (currently only the values "ArrowUp" and "ArrowDown", but futher can also be added). Filters contain name (the one that will be shown near the filter) and type (currently "Dropdown", "Textfield", "Slider" and "Checkbox" are implemented. For "Dropdown" type "Options" and "DefaultSelected" are mandatory, currently the dropdown is implemented for time periods but futher implementations can be added. For "Textfield", "Slider" and "Checkbox" no futher specifications are needed as the values are calculated from the data given in the volumn).

## Adding the theme
Currently two themes are implemented - light and dark, but futher may be added, for that, do the following:
<ol>
<li>Navigate to <a href="src\app\table\theme-colors.ts">table/theme-colors.ts</a> and add the colors for the new theme in the hex format.</li>
<li>Navigate to <a href="src\app\table\table.component.ts">table.component.ts</a> and add the theme name to the Input paramether <code>theme</code> like this: <code>@Input() theme: 'light' | 'dark' | <i>'new-theme-name'</i> = 'light';</code></li>
<li>Now specify the theme as you are using the table like this: <code>&lt;app-table ... [theme]="<i>'new-theme-name'</i>"&gt;&lt;/app-table&gt;</code></li>
<li>[optional] also add the theme with same name to range-slider (<a href="src\app\table\range-slider\theme-colors.ts">link</a>) and custom-dropdown (<a href="src\app\table\custom-dropdown\theme-colors.ts">link</a>) to assure the consistent look.</li>
</ol>

# Futher used elements - dropdown and slider

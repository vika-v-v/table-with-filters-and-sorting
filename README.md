# Table with filters and sorting on Angular
This repository contains a ready-to-use table with filters and sorting from the <a href="https://github.com/vika-v-v/trading-app-frontend">trading app project</a> written in Angular. There is a demo showing the light and dark themes of the table with some example data.

<img src="src\assets\preview\demo_normal.png" alt="Demo">

Demo:
<a href="https://youtu.be/9qGOSBP4Bjg?si=8xCyDKF8YdxDaW4W?autoplay=1"><img src="src\assets\preview\demo_video.png" alt="Demo"></a>

# Get Started
Prerequisites: Node.js and Angular must be installed.
<ol>
<li>Clone this project.</li>
<li>Open the terminal and navigate to the project root.</li>
<li>Run <code>npm i</code> (npm install) to install the necessary node modules.</li>
<li>Run <code>ng s</code> (ng serve) to start the application.</li>
<li>Open <a href="http://localhost:4200/">http://localhost:4200/</a> in your browser.</li>
</ol>

You will see the demo app containing two tables with example data. You can now test it or change some data in it. To use the table in your project, you will need to import the <a href="src\app\table">table</a> component and use it as shown in the demo example. If you also would like to have the same font, you need to import <a href="src\assets\fonts\gully">the 'gully' folder from assets</a> and register the font in your <a href="src\styles.css">styles.css</a> file like this:
<pre>
@font-face {
  font-family: 'Gully';
  src: url('assets/fonts/gully/Gully-Regular.otf') format('opentype');
}
</pre>

You can find the example usage of the table in the <a href="src\app\demo">demo</a> component. To change the data, insert your own in <a href="src\app\demo\demo.component.ts">demo.component.ts</a> (exact parameters are listed below). To change the table's theme, positioning, size, and so on, use <a href="src\app\demo\demo.component.css">demo.component.css</a> and <a href="src\app\demo\demo.component.html">demo.component.html</a>.

# Table parameters
The table takes the following data as parameters:

<ul>
  <li>
    <code>tableHeader</code> - in the format <code>[{ "value": "Name of the Column", "type": Type_Of_The_Data_In_The_Column }, { ... }, ... ];</code> 
    The types are listed in <a href="src\app\table\filter-type.enum.ts">filter-type.enum</a> and can be:
    <ul>
      <li><code>Number</code> - Slider as a filter is shown</li>
      <li><code>Decimal</code> - Slider with decimal values as a filter is shown</li>
      <li><code>Text</code> - Search field as a filter is shown</li>
      <li><code>Date</code> - Dropdown with "All periods", "Today", "Yesterday", "This week", "This month", "This year" values as a filter is shown</li>
      <li><code>Object</code> - List with checkboxes is shown as a filter representing any unique value in the column</li>
    </ul>
  </li>
  <li>
    <code>tableData</code> - in the format <code>[["value for column", "...", ...], [...], ...]</code>. This is an array of arrays, each inner array representing a row in the table, and the values in it should match the header structure provided in <code>tableHeader</code>. See <a href="src\app\demo">demo</a> for an example usage. If no data is provided, the message 'Not yet available.' will be shown instead of the table. You can change this message using the <code>errorEmpty</code> parameter.
  </li>
  <li>
    <i>[optional]</i> <code>errorEmpty</code> - The message shown if no <code>tableData</code> is provided. The default is 'Not yet available.', but it can be changed to any value.
  </li>
  <li>
    <i>[optional]</i> <code>name</code> - The title of the table shown at the top left of the table. By default, it is not shown, but it can be added.
  </li>
  <li>
    <i>[optional]</i> <code>theme</code> - Specifies the theme to use. Can have values <code>light</code>, <code>dark</code> and <code>red</code>. The default is <code>light</code>. Adding a custom theme is described in the "Adding the Theme" section.
  </li>
</ul>

# Customizing the table
This section explains how to further customize the table, including changing the filters used with specified filter types, names, and keys of the sortings. Any changes made will affect all table instances generated with this component.

The configuration of the table is specified in the file <a href="src\app\table\table-config.const.ts">table-config.const.ts</a>. It is an array of objects, each containing its own filter type. Filter types are listed in <a href="src\app\table\filter-type.enum.ts">filter-type.enum.ts</a>. Each filter type has sortings and filters:

<ul>
<li>
Sortings contain:
<ul>
<li><code>name</code>: Can be anything.</li>
<li><code>key</code>: Currently "asc" (ascending) and "desc" (descending) are implemented, but more may be added.</li>
<li><code>icon</code>: Currently only the values "ArrowUp" and "ArrowDown" are used, but additional icons can be added in the future.</li>
</ul>
</li>
<li>
Filters contain:
<ul>
<li><code>name</code>: The name that will be shown near the filter.</li>
<li><code>type</code>: Currently, "Dropdown", "Textfield", "Slider", and "Checkbox" are implemented.</li>
<ul>
<li>For <code>Dropdown</code>-type, <code>Options</code> and <code>DefaultSelected</code> parameters are mandatory. Currently, the dropdown is implemented for time periods, but further implementations can be added.</li>
<li>For <code>Textfield</code>, <code>Slider</code>, and <code>Checkbox</code>-types, no further specifications are needed as the values are calculated from the data given in the column.</li>
</ul>
</ul>
</li>
</ul>

## Adding the theme
Currently, three themes are implemented: light, dark, and red. To add more themes, follow these steps:

<ol>
  <li>Navigate to <a href="src\app\table\theme-colors.ts">table/theme-colors.ts</a> and add the colors for the new theme in hex format.</li>
  <li>Navigate to <a href="src\app\table\table.component.ts">table.component.ts</a> and add the theme name to the input parameter <code>theme</code> like this: 
    <code>@Input() theme: 'light' | 'dark' | <i>'new-theme-name'</i> = 'light';</code>
  </li>
  <li>Add the theme with the same name to the range-slider (<a href="src\app\table\range-slider\theme-colors.ts">link</a>) and custom-dropdown (<a href="src\app\table\custom-dropdown\theme-colors.ts">link</a>) using the same steps.</li>
  <li>Now specify the theme when using the table like this: 
    <code>&lt;app-table ... [theme]="<i>'new-theme-name'</i>"&gt;&lt;/app-table&gt;</code>
  </li>
</ol>
Here is a video explanation on how to add a new theme:
<a href="https://youtu.be/ITlFhMXCpwc?si=gmrtNz5d6Bgp5nug?autoplay=1"><img src="src\assets\preview\adding_theme_video.png" alt="Video Preview for Adding Theme"></a>

# Further used elements - dropdown and slider
There are also some standalone elements that can work independently from the table:

<ul>
  <li><a href="src\app\table\custom-dropdown">Custom Dropdown</a> - developed to extend the functionality of the standard dropdown. Key points to take into account: the maximum height of the dropdown is 40% of the screen; if this height is exceeded, a scrollbar is shown. Additionally, the dropdown usually opens downwards, but if there is no space below, it will open upwards.</li>
  <li><a href="src\app\table\range-slider">Range Slider</a> - a slider with two handles to represent a range. It can also be used separately from the table.</li>
</ul>

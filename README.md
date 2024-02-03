<p align="center">
	<img src="https://github.com/danamira/TermUp/blob/master/.github/TUP-LOGO.png" alt="TermUP logo">
</p>
<h1 align="center">TermUp</h1>
<h3 align="center">Assistant tool for planning your semesters.</h3>
<p align="center">
	<img src="https://github.com/danamira/TermUp/blob/master/.github/Preview.png" alt="Preview image for TermUp">
</p>
<h2>💡 About the app</h2>
<p>This is a tool for the students of University of Tehran helping them pick courses for their future semester. The app enables students to see their weekly schedule beforehand and find timing interceptions between the courses they're thinking about selecting rather than finding them through trial and error during the actual selection period. Users can search between the courses that are being taught in the next semester by entering the title of the course or the name of the professor who teaches the subject. Then they can add the course to their planning board and see how it looks among their other choices and know whether there are any timing conflicts between what they've already picked.</p>
<h2>📚 Using it!</h2>
    <p>A live version is already deployed and ready to be used <a href="http://termup.iran.liara.run">here</a>. Keep in mind that TermUp only consists of a client-side webapp, therefore all of your data including the courses you've picked and your preferences are stored locally on your device. To be more specific the app stores this data on the local storage your browser allocates to the website. You can always get rid of this data by clearing the local storage of your browser.</p>
<h2>👩‍💻 Building the app</h2>
<p>Follow the steps below if you want to build the source code to either make changes for yourself or contribute to the project.
  <ol>
        <li>Make sure you have the latest version of <a href="https://nodejs.org">Node.JS</a> and NPM installed on your machine.</li>
        <li>Install <code>Vue-cli</code> by running <code>npm install -g @vue/cli</code></li>
        <li>Clone the project or download the source code as a <code>.zip</code> file and switch directory to the root folder of the repository.</li>
        <li>Run <code>npm update</code> to install the dependencies.</li>
        <li>Run either <code>npm run dev</code> to boot the local server or <code>npm run build</code> to build the project.
  </ol>
  <p><b>Note:</b>
  I'm using IRANYekan as the default typeface for TermUp. However, this font is a premium font being sold at fontiran.com. Feel free to change the font-family according to your personal preference. If you want to see TermUp as published by the original developers purchase IRANYekan and copy IRANYekanWeb files(.ttf/.eot/.woff/.woff2) to <code>public/fonts</code>.
  For icons, I've used <a href="https://materialdesignicons.com/" title="Material Design Icons Website">Material Design Icons</a> for this project. Version 6.9.5 is included in <code>public/css</code> and  <code>public/fonts</code>. Feel free to upgrade this library to the latest version if you desire. You can also use the CDN links currently commented in <code>public/index.html</code>.
  </p>

  
<h2>✋ Contribution</h2>
<p>This project is maintained by passionate students. We are open to your contributions in these two ways:</p>
<ol>
    <li>Extracting data <code>ems.ut.ac.ir</code> and reformatting it to be used by the app.</li>
    <li>Contributing in the application development process by adding features/resolving and bugs and reporting issues you encounter.</li>
</ol>
<p>See <a href='#'>data contribution guide</a> to find out how you can extract course data from Golestan system and convert it to a <code>.json</code> file expected by the app.</p>

<h3>🌹 Acknowledgements</h3>
<p>TermUP is the result of collective effort of enthusiast students of University of Tehran who like to do open-source. I'd like to thank anyone who contributes by writing code or collecting or processing data. <a href="https://github.com/ArmanHajmohammadi/TermUp-HTML2JSON">This</a> repository in particular helps you to convert raw HTML table data from University's online administration service to suitable <code>.json</code> data files accepted by TermUP.</p>

<p>The <a href="http://termup.nl/">online version of TermUP</a> is hosted by <a href="https://liara.ir/">Liara</a> which is an amazing PaaS provider based in Iran.
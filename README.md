# WrkBook Website

<b>File Structure</b>
<ul>
<li><b>.meteor</b><br>
  Where meteor builds and serves the product from. No code written by us. 
</li>
<li><b>client</b>
  <ul>
    <li><b>main.html</b>
    <br>
    Starting point for the app. What meteor looks at when building it. 
    </li>
    <li><b>main.js</b><br>Not applicable to us. For any javascript you want on the client side that isn't in the React. Importing the app is the starting point of the app</li>
    <li><b>styles.css</b><br>Not applicable to us. For any css you want on the client side that isn't in the React.</li>
  </ul>
</li>
<li><b>imports</b>
  <ul>
    <li><b>api</b><br>Contains all the back end of the app
      <ul>
        <li><b>Schemas</b><br>Contains the schemas for the back end (validating json objects to check if they match the requirements)
          <ul>
              <li><b>availableSchema.js</b><br>Dates workers are available. </li>
              <li><b>basicTextSchema.js</b><br>Text field (250 char). </li>
              <li><b>employeeSchema.js</b><br>Employee structure. </li>
              <li><b>employerSchema.js</b><br>Employer structure</li>
              <li><b>jobSchema.js</b><br>Job post schema. </li>
              <li><b>locationSchema.js</b><br>Location schema</li>
              <li><b>requirementSchema.js</b><br>Job requirement schema. </li>
              <li><b>reviewSchema.js</b><br>Review schema.</li> 
              <li><b>textListSchema.js</b><br>Array of text (job titles e.g. painter, carpenter, etc)</li>
          </ul>
        </li>
        <li><b>Jobs.js</b><br>API for jobs. Creating, editing, removing, and publishing jobs (client can subscribe and get notifications) to client.</li>
        <li><b>Reviews.js</b><br>API for reviews. Same as jobs. </li>
        <li><b>Users.js</b><br>Create, delete, and update users. Calling meteor.users returns just email and profile. Not all tokens</li>
        </li>
      </ul>
    </li>
    <li><b>client</b><br>Contains all the React of the app
      <ul>
      <li><b>Components</b>
        <ul>
          <li><b>Dashboard</b>
            <ul>
            <li><b></b> 
            </ul>
           </li>
          <li><b>Home</b></li>
          <li><b>RegisterLogin</b></li>
          <li><b>Shared</b></li>
         </ul>
      </li>
        <li><b>Pages</b>
        <ul>
          <li><b>Dashboard.js</b></li>
          <li><b>DefaultPage.js</b></li>
          <li><b>SignIn.js</b></li>
          <li><b>SignUp.js</b></li>
          <li><b>home.js</b></li>
        </ul>
        </li>
        <li><b>App.js</b></li>
      </ul>
    </li>
    
  </ul>
</li>




</ul>

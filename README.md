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
              <li><b>availableSchema.js</b></li><br>Dates workers are available. 
              <li><b>basicTextSchema.js</b></li><br>Text field (250 char). 
              <li><b>employeeSchema.js</b></li><br>Employee structure. 
              <li><b>employerSchema.js</b></li><br>Employer structure
              <li><b>jobSchema.js</b></li><br>Job post schema. 
              <li><b>locationSchema.js</b></li><br>Location schema
              <li><b>requirementSchema.js</b></li><br>Job requirement schema. 
              <li><b>reviewSchema.js</b></li><br>Review schema. 
              <li><b>textListSchema.js</b></li><br>Array of text (job titles e.g. painter, carpenter, etc)
          </ul>
        </li>
        <li><b>Jobs.js</b><br>API for jobs. Creating, editing, removing, and publishing jobs (client can subscribe and get notifications) to client.</li>
        <li><b>Reviews.js</b></li>API for reviews. Same as jobs. 
        <li><b>Users.js</b></li>Create, delete, and update users. Calling meteor.users returns just email and profile. Not all tokens
        </li>
      </ul>
    </li>
    <li><b>client</b><br>Contains all the React of the app
      <ul>
        <li></li>
      </ul>
    </li>
    
  </ul>
</li>




</ul>

# WrkBook Website
<ul>
  <li>client</li>
  Where meteor builds and serves the product from. No code written by us. 
  <ul>
    <li>main.html</li>
    Starting point for the app. What meteor looks at when building it. 
    <li>main.js</li>
    Not applicable to us. For any javascript you want on the client side that isn't in the React. Importing the app is      the starting point of the app
    <li>styles.css</li>
    Not applicable to us. For any css you want on the client side that isn't in the React.
  </ul>
  <li>imports</li>
  <ul>
    <li>api</li>
    Contains all the back end of the app
    <ul>
      <li>Images.js</li>
      API for images. Insert images. 
      <li>Jobs.js</li>
      API for jobs. Creating, editing, removing, and publishing jobs (client can subscribe and get notifications) to client
      <li>Reviews.js</li>
      API for reviews. Same as jobs.
      <li>Schemas</li>
      Contains the schemas for the back end (validating json objects to check if they match the requirements)
      <ul>
        <li>availableSchema.js</li>
        Dates workers are available. 
        <li>basicTextSchema.js</li>
        Text field (250 char). 
        <li>employeeSchema.js</li>
        Employee structure. 
        <li>employerSchema.js</li>
        Employer structure
        <li>jobSchema.js</li>
        Job post schema. 
        <li>locationSchema.js</li>
        Location schema
        <li>requirementSchema.js</li>
        Job requirement schema. 
        <li>reviewSchema.js</li>
        Review schema
        <li>textListSchema.js</li>
        Array of text (job titles e.g. painter, carpenter, etc)</
      </ul>
      <li>Users.js</li>
      Create, delete, and update users. Calling meteor.users returns just email and profile. Not all tokens
    </ul>
    <li>client</li>
    <ul>
      <li>App.js</li>
      <li>Components</li>
      <ul>
        <li>JobPostEmployer.js</li>
        <li>avatarcard.js</li>
        <li>contractsu2.js</li>
        <li>employeeComponent.js</li>
        <li>employeesu2.js</li>
        <li>employeesu3.js</li>
        <li>employeesu4.js</li>
        <li>jobPost.js</li>
        <li>jobpostinfocomponent.js</li>
        <li>navigationBar.js</li>
        <li>profileaboutcard.js</li>
        <li>profilecertification.js</li>
        <li>profilejob.js</li>
        <li>profilepayment.js</li>
        <li>profilereviewcard.js</li>
        <li>reviewCard.js</li>
        <li>signup.js</li>
      </ul>
      <li>Pages</li>
      <ul>
        <li>dummy.js</li>
        <li>home.js</li>
        <li>jobPosts.js</li>
        <li>login.js</li>
        <li>notFound.js</li>
        <li>profile.js</li>
        <li>register.js</li>
        <li>stepTwo.js</li>
      </ul>
      <li>history.js</li>
    </ul>
  </ul>
  <li>package.json</li>
  <li>public</li>
  <ul>
    <li>images</li>
    <ul>
      <li>Construction.jpg</li>
      <li>americanexpress.png</li>
      <li>calendar.png</li>
      <li> discover.png</li>
      <li> email.png</li>
      <li> facebook.png</li>
      <li> handshake.png</li>
      <li> handshakesmall.png</li>
      <li> instagram.png</li>
      <li> jobpost.png</li>
      <li> mastercard.ico</li>
      <li> mastercard.png</li>
      <li> network.png</li>
      <li> paypal.png</li>
      <li> profile.png</li>
      <li> rate.png</li>
      <li>tools.png</li>
      <li> visa.png</li>
      <li> worker.png</li>
      <li> wrkBookLogo.png</li>
      <li> wrkBookV2.jpg</li>
      <li> wrkbook.png</li>
    </ul>
  </ul>
  <li>server</li>
  <ul>
    <li>main.js</li>
    <li>service-config.js</li>
  </ul>
</ul>




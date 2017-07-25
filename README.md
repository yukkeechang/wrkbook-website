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
              <li><b>Jobs</b>
                <ul>  
                  <li><b>JobPost.js</b></li>
                  <li><b>SearchBar.js</b></li>
                </ul>
              </li>
              <li><b>Profile</b></li>
              <li><b>Settings</b></li>
              <li><b>CreateJob.js</b></li> 
              <li><b>Jobs.js</b></li>
              <li><b>Links.js</b></li>
              <li><b>Profile.js</b></li>
              <li><b>Settings.js</b></li>
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


├── client
│   ├── main.html
│   ├── main.js
│   └── styles.css
├── imports
│   ├── api
│   │   ├── Images.js
│   │   ├── Jobs.js
│   │   ├── Reviews.js
│   │   ├── Schemas
│   │   │   ├── availableSchema.js
│   │   │   ├── basicTextSchema.js
│   │   │   ├── employeeSchema.js
│   │   │   ├── employerSchema.js
│   │   │   ├── jobSchema.js
│   │   │   ├── locationSchema.js
│   │   │   ├── requirementSchema.js
│   │   │   ├── reviewSchema.js
│   │   │   └── textListSchema.js
│   │   └── Users.js
│   └── client
│       ├── App.js
│       ├── Components
│       │   ├── JobPostEmployer.js
│       │   ├── avatarcard.js
│       │   ├── contractsu2.js
│       │   ├── employeeComponent.js
│       │   ├── employeesu2.js
│       │   ├── employeesu3.js
│       │   ├── employeesu4.js
│       │   ├── jobPost.js
│       │   ├── jobpostinfocomponent.js
│       │   ├── navigationBar.js
│       │   ├── profileaboutcard.js
│       │   ├── profilecertification.js
│       │   ├── profilejob.js
│       │   ├── profilepayment.js
│       │   ├── profilereviewcard.js
│       │   ├── reviewCard.js
│       │   └── signup.js
│       ├── Pages
│       │   ├── dummy.js
│       │   ├── home.js
│       │   ├── jobPosts.js
│       │   ├── login.js
│       │   ├── notFound.js
│       │   ├── profile.js
│       │   ├── register.js
│       │   └── stepTwo.js
│       └── history.js
├── package.json
├── public
│   └── images
│       ├── Construction.jpg
│       ├── americanexpress.png
│       ├── calendar.png
│       ├── discover.png
│       ├── email.png
│       ├── facebook.png
│       ├── handshake.png
│       ├── handshakesmall.png
│       ├── instagram.png
│       ├── jobpost.png
│       ├── mastercard.ico
│       ├── mastercard.png
│       ├── network.png
│       ├── paypal.png
│       ├── profile.png
│       ├── rate.png
│       ├── tools.png
│       ├── visa.png
│       ├── worker.png
│       ├── wrkBookLogo.png
│       ├── wrkBookV2.jpg
│       └── wrkbook.png
└── server
    ├── main.js
    └── service-config.js

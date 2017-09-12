# WrkBook Website
## How to Run :money_with_wings: :money_with_wings: Strip :money_with_wings: :money_with_wings: With Meteor
1. In settings-development.json replace `APIKEY` with the actual public and
private key associated with strip.
2. Run `meteor --settings settings-development.json`
3. :fearful:
4. :sob:
### Ignore things below (Not updated)
<html>
<head>
</head>
<body>

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
  Javascript files to be imported and used when needed by the client
  <ul>
    <li>api</li>
    Contains all the back end of this app
    <ul>
      <li>Emails</li>
      <ul>
        <li>Email.js</li>
        Functions for user emails. Authorize and enroll an email address for a new Wrkbook user. Email password reset
      </ul>
      <li>Payment</li>
      <ul>
        <li>Cards.js</li>
        Process credit/debit card info from Contractors
        <li>Customer.js</li>
        Process info related to customers (subscribers)
        <li>index.js</li>
        *No Current Use*
        <li>Subscriptions.js</li>
        Process info related to subscriptions
      </ul>
      <li>Schemas</li>
      Contains the schemas for the back end (validating json objects to check if they match the requirements)
      <ul>
        <li>availableSchema.js</li>
        Dates workers are available.
        <li>basicTextSchema.js</li>
        Text field (250 char).
        <li>channelSchema.js</li>
        *No Current Use*
        <li>educationSchema.js</li>
        Employee education (GED/Trade School/Higher Ed)
        <li>employeeSchema.js</li>
        Employee structure.
        <li>employerSchema.js</li>
        Employer structure
        <li>eventSchema.js</li>
        Job & non-job events
        <li>importanceSchema.js</li>
        How critical is something
        <li>jobSchema.js</li>
        Job post schema.
        <li>locationSchema.js</li>
        Location schema
        <li>messageSchema.js</li>
        Message schema
        <li>notificationSchema.js</li>
        Notification schema
        <li>oshaSchema.js</li>
        Is employee osha certified
        <li>professionalSchema.js</li>
        Details of a job
        <li>referenceSchema.js</li>
        Professional references schema
        <li>requirementSchema.js</li>
        Job requirement schema.
        <li>reviewSchema.js</li>
        Review schema
        <li>socialSchema</li>
        Personal info
        <li>supervisorSchema</li>
        Supervisor schema
        <li>textListSchema.js</li>
        Array of text (job titles e.g. painter, carpenter, etc)
      </ul>
      <li>Events.js</li>
      Process info related to events
      <li>Images.js</li>
      Process and store images
      <li>Jobs.js</li>
      Process info related to jobs
      <li>Notifications.js</li>
      Process info related to notifications
      <li>References.js</li>
      Process info related to professional references
      <li>Reviews.js</li>
      Process info related to reviews for contractors and profesionals
      <li>Users.js</li>
      Create, delete, and update users. Calling meteor.users returns just email and profile. Not all tokens
    </ul>
    <li>client</li>
    <ul>
      <li>Pages</li>
      <ul>
        <li>Home</li>
        <ul>
          <li>Components</li>
          <ul>
            <li>EventModal</li>
            <ul>
              <li>NonJobEventCreate.js</li>
              Modal to create a new non-job event
              <li>NonJobEventModal</li>
              View or create a new non-job event
              <li>NonJobEventView</li>
              Modal to view an existing non-job event
            </ul>
            <li>ConfirmationsCard.js</li>
            Card component that displays overview of a single job. Pops up to JobDetailModal.js
            <li>HourRow.js</li>
            One row in the dashbaord home.js agenda
            <li>JobDetailModal.js</li>
            Modal popup that displays details of a single job
          </ul>
          <li>Home.js</li>
          Home component for dashboard
        </ul>
        <li>Jobs</li>
        <ul>
          <li>ConDash.js</li>
          Dashboard that displays details and navigation related to your profile (Contractors)
          <li>CreateJobs.js</li>
          Form to create a new job
          <li>EmpDash.js</li>
          Dashboard that displays details and navigation related to your profile (Employees)
          <li>Jobs</li>
          <ul>
            <li>ConJobPostComponent.js</li>
            Details for a job that the current user (Contractor) has released
            <li>ConJobsPosts.js</li>
            ConJobPost listings to display on Contractor dashboard
            <li>CreateJobs.js</li>
            Create a job
            <li>EmpJobPostAdmit.js</li>
            Jobs that the Employee has accepted
            <li>EmpJobPostComponent.js</li>
            Details for a job avaiable to the current user (Employee)
            <li>EmployeeComponent.js</li>
            Details about an employee that has applied for a job
            <li>Jobs.js</li>
            Displays EmpJobPosts or ConJobPosts depending on current user
            <li>MultiProComponent.js</li>
            Create a job that needs multiple employees
          </ul>
          <li>Profile</li>
          <ul>
            <li>Components</li>
            <ul>
              <li>About.js</li>
              Details about a user
              <li>Certifications.js</li>
              Certifications that a user has
              <li>Contact.js</li>
              Contact info for a user
              <li>GeneralInfo.js</li>
              Miscellaneous info about a user
              <li>Payment.js</li>
              Payment details for a user
              <li>Rating.js</li>
              Ratings for a user
              <li>ReviewCard.js</li>
              Details for one review of a user
              <li>Reviews.js</li>
              Reviews of a professional, given by contractors
            </ul>
            <li>Edit</li>
            <ul>
              <li>ContractorEdit.js</li>
              Edit details for a contractor's profile
              <li>Edit.js</li>
              Wrapper for ContractorEdit/ProfessionalEdit
              <li>ProfessionalEdit.js</li>
              Edit details for a professional's profile
            </ul>
            <li>Profile.js</li>
            Component that contains all user detail sub-components
          </ul>
          <li>References</li>
          <ul>
            <li>EditRef.js</li>
            Edit a referral
            <li>NewRef.js</li>
            Submit a new referral
          </ul>
          <li>Settings</li>
          <ul>
            <li>Edit</li>
            Some features redundant with ContractorEdit.js/ProfessionalEdit.js in Profile directory
            <ul>
              <li>ContractorEdit.js</li>
              Edit details for a contractor's profile
              <li>Edit.js</li>
              Wrapper for ContractorEdit/ProfessionalEdit
              <li>ProfessionalEdit.js</li>
              Edit details for a professional's profile
            </ul>
            <li>Notifications.js</li>
            Notifications settings for a user
            <li>PasswordChange.js</li>
            Change a user's password
            <li>Subscription.js</li>
            Subscription details for a user
          </ul>
          <li>DummyEvents.js</li>
          Dummy Events for testing
          <li>EditJobs.js</li>
          Edit an existing job
          <li>Jobs.js</li>
          *No Current Use*
          <li>References.js</li>
          Component for submitting references
          <li>SendReviews.js</li>
          Send reviews
        </ul>
        <li>Home</li>
        <ul>
          <li>Style.js</li>
          Style for the dashboard
        </ul>
        <li>LandingPageComponents</li>
        <ul>
          <li>HowTo</li>
          <ul>
            <li>Step.js</li>
            One step in the HowTo infographic
          </ul>
          <li>About.js</li>
          WrkBook origin story
          <li>Hero.js</li>
          WrkBook pitch component, contains intro links for employees and contractors
          <li>HowTo.js</li>
          How WrkBook works Infographic
        </ul>
        <li>Shared</li>
        <ul>
          <li>Header</li>
          <ul>
            <li>Base.js</li>
            Base of the website header
            <li>Navbar.js</li>
            Fixed navbar of the header
          </ul>
          <li>Avatar.js</li>
          User's custom avatar
          <li>Button.js</li>
          Custom button
          <li>Footer.js</li>
          Website footer
          <li>Header.js</li>
          Website Header
          <li>Location.js</li>
          Custom location input component
          <li>MSpinner.js</li>
          Custom loading spinner
          <li>MTextField.js</li>
          Custom text field input
          <li>UserIcon.js</li>
          User icon
          <li>WrkBookIcon.js</li>
          Wrkbook icon
        </ul>
        <li>SignUp</li>
        <ul>
          <li>Congrats.js</li>
          Message that confirms a user has successfully signed up for WrkBook
          <li>StepOne.js</li>
          First step to sign up as a Contractor or Employee
          <li>StepTwoC.js</li>
          Signup form Step Two for Contractors
          <li>StepTwoE.js</li>
          Signup form Step Two for Employees
          <li>StepThree.js</li>
          Signup form Step Three
        </ul>
        <li>Shared</li>
        <ul>
          <li>404.js</li>
          Custom 404 page
          <li>Footer.js</li>
          Footer Component
          <li>Header.js</li>
          Header Component
        </ul>
        <li>Dashboard.js</li>
        Base Dashboard component for users
        <li>DefaultPage.js</li>
        Main homepage of WrkBook
        <li>EmployeeNoUpcomingJobs.js</li>
        Display when employee has no upcoming jobs
        <li>EmployerNoUpcomingJobs.js</li>
        Display when employer has no jobs listed
        <li>Forgot.js</li>
        Help signing in for an existing user
        <li>LandingPage.js</li>
        Home page for users who aren't signed in
        <li>NotFound.js</li>
        Custom 404
        <li>Payment.js</li>
        Make a payment for a subscription
        <li>ResetPassword.js</li>
        Change your password
        <li>SignIn.js</li>
        Login to your account
        <li>SignUp.js</li>
        Register for an account
      </ul>
      <li>App.js</li>
      Base component with react-router configurations. Entry point for Meteor
      <li>Collections.js</li>
      Mongo collections for the database
      <li>Verification.js</li>
      Verification methods for user passwords
    </ul>
  </ul>
  <li>package.json</li>
  <li>public</li>
  <ul>
    <li>images</li>
    <ul>
      <li>facebook.png</li>
      Facebook logo
      <li>heroBG.jpg</li>
      Homepage main background
      <li>instagram.png</li>
      Instagram logo
      <li>jobpost.png</li>
      Job Post icon
      <li>network.png</li>
      User networking icon
      <li>profile.png</li>
      User profile icon
      <li>tools.png</li>
      Tools icon
      <li>worker.jpg</li>
      Worker background
      <li>worker.png</li>
      Worker icon
      <li>worker.webp</li>
      <li>wrkbook.png</li>
      WrkBook logo
      <li>wrkbookfooter.png</li>
      WrkBook logo for footer
    </ul>
  </ul>
  <li>server</li>
  <ul>
    <li>main.js</li>
    <li><del>service-config.js</del></li>
    <li>service-config.js</li>

  </ul>
</ul>

</body>
</html>

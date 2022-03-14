# Help Me Heal

### Background

HelpMeHeal is an app that helps patients who just finished surgery to be on track for their rehabilitation and provide an easy channel for communication with the doctor. It also allows the doctor to easily track and monitor the progress of his/her patients.

### Installation
Node
Install Node.js for your system. Once installed, download dependencies with `npm install`. To view the live version of the web app, run `npm start` in the project’s  root directory. 

### Firebase
The backend for this project uses firebase. To attach the database to the project, create an account in firebase and create a realtime database. Note that the database is stored as one large JSON file. We store data in the following structure
```
root:
  surgery
    acl 
      days 
        1
        …
      phaseEndDay
        21
        …
      phases
        1
        …
      videoUrls
        0
        …
  …  (other surgery recovery programs)
  survey
    Day 1
      (the specifics vary, we use survey.js to create the surveys and they have their syntax for storing a survey which is a json. 
      Consult their documentation for storing a survey into firebase. 
    …
  user 
    googleID 
      doctorID (int)
      Email (string)
      Name (string)
      startDate (time in Epoch)
      surgeryType (a type from root-surgery)
      surveyResults (response data to survey)
        0
        …
      userType (patient/doctor)
```
### Integration Tests
Run `​​npm install cypress --save-dev` to install Cypress on your machine. Next, run `npm start` to start the local development server. Once the server is running, run `npm run cypress:open` to launch the Cypress desktop application. In the Cypress UI, you will see the `.spec.js` files that are created. Click on any of them to run them.

### EmailJs 
Go to https://www.emailjs.com/ to create an service account. Set up a new service and set up template and templateParams for replying. Put the serviceId, templateId, your userId in below code. <br />
`emailjs.send(serviceID, templateID, templateParams, userID);`

### Usage
You can use this application as both patient and as a doctor. Check below for more details.

#### As Patient:
You can create an account using google login and then use the code issued by hospital which would fetch the details regarding your surgery type and link you with doctor.

As soon as patient login, on the landing page, he/she would see
A welcome message
Currently, which phase and day of the phase he/she are in their recovery progress
A Todo list to track their day’s tasks
Navigation bar at the bottom to take them to daily survey, rehabilitation video, email doctor and logout

DAILY SURVEY: 
To track a patient’s progress and keep the doctor updated, we have a daily survey which is expected to be filled out by the patient every day.

REHABILITATION VIDEO:
To help a patient deal with varying pain levels at varying stages of recovery they are provided with videos of the exercises they are supposed to perform on that day.

EMAIL DOCTOR:
In case the patient needs to communicate with a doctor, they can use the email doctor feature to send in the message across to a doctor.

LOGOUT:
Logs the patient out of application.

#### As Doctor:

You can create an account using google login and add patients to their list with the surgery type by giving patients codes.

The home page of the doctor should include
A table with the list of patients and their surgery types, status, and concerns
A button to add new patients
A navigation bar at the bottom with a home button and an email button
A search bar for patients

PATIENT DETAILS:
Click on any of your patients in the table to view information regarding their recovery progress.

PATIENT PAGE: 
The doctor can see the patient’s progress through a table with pain, rehab successful, and concerns columns along with two graphs at the bottom.

EMAIL PATIENT:
In case the doctor needs to communicate with a patient, they can use the email patient feature to send a message to a specific patient.

LOGOUT:
Logs the doctor out of application.

### Contributors: 
The Yellow Team

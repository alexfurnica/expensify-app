import * as firebase from 'firebase'

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

const database = firebase.database()

export {firebase, database as default}

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('value', (snapshot) => {
//   const expenses = []

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })  
//   })

//   console.log(expenses)
// })

// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//   const expenses = []

//   snapshot.forEach((childSnapshot) => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     })
//   })

//   console.log(expenses)
// })

// const expenses = [
//   {
//     description: '1',
//     note: '1',
//     amount: '100',
//     createdAt: '1'
//   }, {
//     description: '2',
//     note: '2',
//     amount: '200',
//     createdAt: '2'
//   }, {
//     description: '3',
//     note: '3',
//     amount: '300',
//     createdAt: '3'
//   }
// ]

// expenses.forEach((expense) => {
//   database.ref('expenses').push(expense)
// })

// const firebaseNotes = {
//   notes: {
//     alkjfklds: {
//       title: 'First note',
//       body: 'This is my note'
//     },
//     dfdjshlfhds: {
//       title: 'Another note',
//       body: 'This is my note 2: return of the note'
//     }
//   }
// }

// const onValueChange = database.ref().on('value', (snapshot) => {
//   console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}`)
// })

// database.ref().set({
//   name: 'Alex Furnica',
//   age: 25,
//   stressLevel: 6,
//   job: {
//     title: 'Data Analyst',
//     company: 'Philips'
//   },
//   location: {
//     city: 'Eindhoven',
//     country: 'Netherlands'
//   }
// }).then(() => {
//   console.log('Data is saved')
// }).catch((error) => {
//   console.log('This failed.')
// })

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// })

// database.ref('isSingle')
//   .remove()
//   .then(() => {
//     console.log('Data was removed')
//   }).catch((error) => {
//     console.log('Did not remove data', e)
//   })

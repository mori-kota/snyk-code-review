const admin = require('firebase-admin');
admin.initializeApp();

async function updateUser(userId, newData) {
  const db = admin.firestore();
  const userRef = db.collection('users').doc(userId);

  // Firestoreでユーザーを更新する
  await userRef.update(newData);
}

updateUser('123', { name: 'John Doe', age: 30 });
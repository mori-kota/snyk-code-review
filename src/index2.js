const firestore = require('firebase-admin').firestore();

async function createUser(userId, userData) {
    const userRef = firestore.collection('users').doc(userId);

    // トランザクションを使っていないため、冪等性に問題があるコード
    try {
        const docSnapshot = await userRef.get(); // ドキュメントの存在確認
        if (docSnapshot.exists) {
            await userRef.update(userData); // データを直接更新（冪等性なし）
            console.log('ユーザー情報を更新しました');
        } else {
            await userRef.set(userData); // データを新規作成
            console.log('ユーザー情報を作成しました');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}
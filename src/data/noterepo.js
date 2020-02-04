import { firebaseStore } from './firebase'

const FirebaseNotes = firebaseStore.collection('todos');

const notesDB = () => {
    const add = note => {
        return FirebaseNotes.add(note);
    }

    const remove = id => {
        return FirebaseNotes.doc(id).delete();
    }

    const update = (noteId, noteInfo) => {
        return FirebaseNotes.doc(noteId).update(noteInfo);
    }

    const retrieveByDate = (dateString, userId) => {
        let query = FirebaseNotes
            .where("uid", "==", userId)
            .where("dateString", "==", dateString);

        return query.orderBy("created");
    }

    const retrieveAll = (userId) => {
        let query = FirebaseNotes
            .where("uid", "==", userId)

        return query.orderBy("created");
    }

    const retrieveFavorites = (userId) => {
        let query = FirebaseNotes
            .where("uid", "==", userId)
            .where("isFavorite", "==", true)

        return query.orderBy("created");
    }

    return Object.freeze({
        add,
        remove,
        update,
        retrieveByDate,
        retrieveAll,
        retrieveFavorites
    })
}

const notesRepository = notesDB();

export { notesRepository }
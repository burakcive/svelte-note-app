import { firebaseStore } from './firebase'

const FirebaseNotes = firebaseStore.collection('todos');

const notesDB = () => {
    const add = note => {
        FirebaseNotes.add(note)
    }

    const remove = id => {
        FirebaseNotes.doc(id).delete();
    }

    const update = (noteId, noteInfo) => {
        return FirebaseNotes.doc(noteId).update(noteInfo);
    }

    const retrieve = (dateString, userId) => {
        let query = FirebaseNotes
            .where("uid", "==", userId)
            .where("dateString", "==", dateString);

        return query.orderBy("created");
    }

    return Object.freeze({
        add,
        remove,
        update,
        retrieve
    })
}

const notesRepository = notesDB();

export { notesRepository }
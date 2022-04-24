import { useEffect, useState } from "react"
import firebase from "../../Services/firebaseconnection";

const [animeSave, setAnimeSave] = useState([]);


useEffect(() => {

    async function listSave() {
        const user = firebase.auth().currentUser

        await firebase
            .firestore()
            .collection("favorites")
    }

})


export default function Saves() {
    return (
        <div>

        </div>
    )
}
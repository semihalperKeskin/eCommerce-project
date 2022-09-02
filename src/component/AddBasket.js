import React from 'react'
import db from '../firebase';

function AddBasket(cls, item) {
    
    const findId = (items) => {
        db.collection("products").where("name", "==", items.name)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({ quantity: doc.data().quantity + 1 })
                });
            })
    }
    return (
        <a onClick={() => findId(item.item)} className={`btn btn-warning ${cls.cls}`} >Sepete ekle</a>
    )
}

export default AddBasket
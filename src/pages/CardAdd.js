import React, { useState } from 'react'
import db, { storage, storageRef } from '../firebase';
import toast from "react-hot-toast"
import "./CardAdd.css"

function CardAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);
  const [image3Url, setImage3Url] = useState(null);
  const [description, setDescription] = useState("");

  const quantity= 0;


  const onChangeValue = (e) => {
    setCategory(e.target.value)
  }

  const imageUpload = () => {
    const uploadTask = storage.ref(`images/${image1.name}`).put(image1);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

      },
      error => {
        toast.error(error.message)
      },
      () => {
        storage
          .ref("images")
          .child(image1.name)
          .getDownloadURL()
          .then(url => {
            setImage1Url(url);
            toast.success("Resim 1 eklendi.")
          });
      }
    );
  }


  const image2Upload = () => {
    const uploadTask = storage.ref(`images/${image2.name}`).put(image2);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        toast.error(error.message)
      },
      () => {
        storage
          .ref("images")
          .child(image2.name)
          .getDownloadURL()
          .then(url => {
            setImage2Url(url);
            toast.success("Resim 2 eklendi.")
          });
      }
    );
  }
  const image3Upload = () => {
    const uploadTask = storage.ref(`images/${image3.name}`).put(image3);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        toast.error(error.message)
      },
      () => {
        storage
          .ref("images")
          .child(image3.name)
          .getDownloadURL()
          .then(url => {
            setImage3Url(url);
            toast.success("Resim 3 eklendi.")
          });
      }
    );
  }

  const sub = (e) => {
    e.preventDefault();


    // Add data to the store
    db.collection("products").add({
      category: category,
      name: name,
      nameToUpper: name.toUpperCase(),
      price: price,
      size: size,
      image1: image1Url,
      image2: image2Url,
      image3: image3Url,
      description: description,
      quantity: quantity

    })
      .then((doc) => {
        toast.success("Ürün başarıyla eklendi.")

      })
      .catch((error) => {
        toast.error(error.message)
      });
    setName("")
    setPrice("")
    setSize("")
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setDescription("")
  }
  return (
    <div>
      <center>
        <div className='card-add-div'>
        <div className='uploadForm'>
          <h3>** ilk olarak seçtiğiniz fotoğragları upload butonuna basarak upload etmekisiniz.</h3>
          <label className='imageUpload' for="img1"> Resim 1 : </label>
          <input className='inputUpload' type="file" id='img1' placeholder="image1" onChange={(e) => { setImage1(e.target.files[0]) }}
          />
          <button onClick={() => imageUpload()}>Upload</button>
          <br />

          <label className='imageUpload' for="img2"> Resim 2 : </label>
          <input className='inputUpload' type="file" id="img2" placeholder="image2" onChange={(e) => { setImage2(e.target.files[0]) }}
          />
          <button onClick={() => image2Upload()}>Upload</button>
          <br />

          <label className='imageUpload' for="img3"> Resim 3 : </label>
          <input className='inputUpload' type="file" id='img3' placeholder="image3" onChange={(e) => { setImage3(e.target.files[0]) }}
          />
          <button onClick={() => image3Upload()}>Upload</button>
        </div>

        <form className='card-add'
          onSubmit={(event) => { sub(event) }}>

          <label for="img3"> Katagori : </label>
          <div className="form-check" >
            <input type="radio" name="flexRadioDefault" value="mont" id="flexRadioDefault1" onChange={onChangeValue} />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Mont
            </label>
          </div>
          <div className="form-check" >
            <input type="radio" name="flexRadioDefault" value="bot" id="flexRadioDefault2" onChange={onChangeValue} />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Bot
            </label></div>

          <div className="form-check" >
            <input type="radio" name="flexRadioDefault" value="eldiven" id="flexRadioDefault3" onChange={onChangeValue} />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Eldiven
            </label>
          </div>
          <br />

          <label htmlFor="name"> Ürün adı: </label>
          <input className='input' type="text" id='name' maxLength="55" value={name} placeholder="Ürün adını giriniz. Max: 55"
            onChange={(e) => { setName(e.target.value) }} />
          <br />

          <label htmlFor="price"> Ürün fiyatı : </label>
          <input className='input' type="number" step={0.01} id='price' placeholder="Ürün fiyatını giriniz" value={price}
            onChange={(e) => { setPrice(parseFloat(e.target.value)) }} />
          <br />

          <label htmlFor="size"> Ürün bedenleri : </label>
          <input className='input' type="text" id='size' placeholder="Ürün bedenlerini giriniz" value={size}
            onChange={(e) => { setSize(e.target.value) }} />
          <br />

          <label htmlFor="description"> Ürün açıklaması : </label>
          <input className='input' style={{ resize: "none" }} maxlength="500" value={description} type="text" rows="10" cols="100" id='description' placeholder="Ürün açıklaması giriniz. Max: 500"
            onChange={(e) => { setDescription(e.target.value) }} />
          <br />

          <button type="submit">Kaydet</button>
        </form>
        </div>
      </center>
    </div>
  )
}
export default CardAdd
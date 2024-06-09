import React, { useState, useEffect } from 'react'
import api from '../../../../../utils/fetcher'

export default function ThumbnailImage({ onchangeUrl }) {

   return (
      <div className="row mb-4">
         <label className="col-3 col-form-label"> Thumbanil image * <br />
            <small className="text-muted">(Max 8 mb)</small> </label>
            <ImageUploader onchangeUrl={onchangeUrl} />
      </div>
   )
}


const ImageUploader = ({onchangeUrl}) => {
   const [imageb64, setImageb64] = useState(null)
   const selectProfileImage = () => {
      const input = document.createElement("input")
      input.type = 'file'

      input.onchange = (i) => {
         console.log(i.target.files)
         if (i.target.files && i.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               //  console.log(e.target.result)
               setImageb64(e.target.result)
            };
            reader.readAsDataURL(i.target.files[0]);
            uploadImage(i)
         }
      }
      input.click()
   }
   async function uploadImage(i) {
      const formData = new FormData();
      formData.append('filename', i?.target?.files?.[0]?.name);
      formData.append('image', i.target.files[0]);
      const response = await api.post('/upload/image', formData)
      console.log(response)
      onchangeUrl(response.data)
   }

   return <div className="col-9">
      <div className="gallery-uploader-wrap">
         <label style={{ width: "80px", height: "80px" }} className="uploader-img">
            {imageb64 != null ? <img src={imageb64} alt="no-image-selected" style={{ width: "80px", height: "80px" }} onClick={selectProfileImage} /> : <svg onClick={selectProfileImage} xmlns="http://www.w3.org/2000/svg" fill="#999" width="32" height="32" viewBox="0 0 24 24">
               <circle cx="12" cy="12" r="3"></circle>
               <path d="M16.83 4L15 2H9L7.17 4H2v16h20V4h-5.17zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
            </svg>}
         </label>
      </div>

   </div>
}

export {ImageUploader};
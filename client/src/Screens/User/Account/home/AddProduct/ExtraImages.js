import React from 'react'
import {ImageUploader} from './ThumbnailImage'

export default function ExtraImages({  onChange }) {

   const [images , setImages] = React.useState([]);

   React.useEffect(()=>{
      onChange(images)
   },[images])

   return (
      <div className="row mb-4">
         <label className="col-3 col-form-label"> Extra Images (max 5 allowed) <br /> <small className="text-muted">(Max size 8 mb)</small> </label>
         <div className="col-9">
            <div className="gallery-uploader-wrap">
               <form encType='multipart-formdata'>
                  <label style={{ width: "80px", height: "80px" }} className="uploader-img">
                     <ImageUploader onchangeUrl={(res) =>{
                         setImages([...images , res.url])
                         }} />
                  </label>
                  <label style={{ width: "80px", height: "80px" }} className="uploader-img">
                     <ImageUploader onchangeUrl={(res) =>{
                         setImages([...images , res.url])
                         }}  />
                  </label>
                  <label style={{ width: "80px", height: "80px" }} className="uploader-img">
                     <ImageUploader onchangeUrl={(res) =>{
                         setImages([...images , res.url])
                         }}  />
                  </label>
                  <label style={{ width: "80px", height: "80px" }} className="uploader-img">
                     <ImageUploader onchangeUrl={(res) =>{
                         setImages([...images , res.url])
                         }}  />
                  </label>
                  <label style={{ width: "80px", height: "80px" }} className="uploader-img">
                     <ImageUploader onchangeUrl={(res) =>{
                         setImages([...images , res.url])
                         }}   />
                  </label>
               </form>
            </div>

         </div>

      </div>
   )
}

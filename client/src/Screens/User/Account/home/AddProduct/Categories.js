import React, {  useEffect , useState} from 'react'

import api from '../../../../../utils/fetcher'

export default function Categories({onChange}) {

   const [categories, setCategorys] = useState([])

   useEffect(() => {
       loadCategory()
   }, [])


   const loadCategory = async () => {
       const { data } = await api.get('/admin/categories');
       if (data.status) {
           setCategorys(data.categories)
       }
   }

  return (
    <div className="row mb-4">
    <label className="col-3 col-form-label">Sub Catgeories</label> 
    <div className="col-9">
       <ul className="row row-cols-xxl-3 row-cols-2">
         {categories.map(category => <li> <label className="form-check"> <input className="form-check-input" type="radio" name='categories' value={category.cat_name} onChange={onChange} /> <span className="form-check-label"> {category.cat_name}  </span> </label> </li>)}
       </ul>
    </div>

 </div>
  )
}

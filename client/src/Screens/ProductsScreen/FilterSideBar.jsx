import { useState, useEffect } from 'react';
import api from '../../utils/fetcher';
import { Link } from 'react-router-dom';


const FilterSideBar = ({setMinPrice , setMaxPrice , ApplyPricefilter}) => {
   const [categories, setCategories] = useState([])
   const [brands, setBrands] = useState([])

   useEffect(() => {
      loadCategorys()
      loadBrand()
   }, [])

   const loadCategorys = async () => {
      const { data } = await api.get('/admin/categories')
      if (data.status) {
         console.log(data.categories, 'categories')
         setCategories(data.categories)
      }
   }
   const loadBrand = async () => {
      const { data } = await api.get('/admin/brands')
      if (data.status) {
         console.log(data.brands, 'brands')
         setBrands(data.brands)
      }
   }

   return (
      <div>
         <div class="card">
            <article class="filter-group">
               <header class="card-header"> <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1"> <i class="icon-control fa fa-chevron-down"></i> Categories </a> </header>
               <div class="collapse show" id="collapse_aside1">
                  <div class="card-body">
                     <ul class="list-menu">
                        {categories.map(category => <li key={category._id}><Link to={`/category/${category._id}/${encodeURIComponent(category.cat_name)}`}>{category.cat_name}</Link></li>)}
                     </ul>
                  </div>

               </div>
            </article>

            <article class="filter-group">
               <header class="card-header"> <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2"> <i class="icon-control fa fa-chevron-down"></i> Price </a> </header>
               <div class="collapse show" id="collapse_aside2">
                  <div class="card-body">
                     <div class="row mb-3">
                        <div class="col-6"> <label class="form-label">Min</label> <input class="form-control" placeholder="$0" type="number" onChange={(e)=> setMinPrice(Number(e.target.value))} /> </div>

                        <div class="col-6"> <label class="form-label">Max</label> <input class="form-control" placeholder="$1,0000" type="number" onChange={(e)=> setMaxPrice(Number(e.target.value))} /> </div>

                     </div>
                     <button class="btn btn-light w-100" type="button" onClick={ApplyPricefilter} >Apply</button>
                  </div>

               </div>
            </article>



            <article class="filter-group">
               <header class="card-header"> <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside4"> <i class="icon-control fa fa-chevron-down"></i> Brand type </a> </header>
               <div class="collapse show" id="collapse_aside4">
                  <div class="card-body">
                    {brands.map(brand => {
                     return  <label class="form-check mb-2">
                     <input class="form-check-input" type="checkbox" checked="" name="choose_x" />
                     <span class="form-check-label"> {brand.brand_name} </span> </label>
                    })}
                 </div>

               </div>
            </article>



         </div>
      </div>
   );
}

export default FilterSideBar;



import Baby from '../../Assets/baby.png'

export default function AboutUs() {
  return <section class="py-3 py-md-5 py-xl-8">
    <div class="container">
      <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
        <div class="col-12 col-lg-6 col-xl-5">
          <img class="img-fluid rounded" loading="lazy" src={Baby} alt="" />
        </div>
        <div class="col-12 col-lg-6 col-xl-7">
          <div class="row justify-content-xl-center">
            <div class="col-12 col-xl-11">
              <h2 class="h1 mb-3">Who Are We?</h2>
              <p class="lead fs-4 text-secondary mb-3">At Kids Good Hub, we understand the importance of nurturing a child's imagination, creativity, and joy. We believe that every child deserves access to a wide variety of toys that can enhance their learning experience and bring endless hours of fun. </p>
              <p class="mb-5">Our mission is to provide a one-stop destination for parents, caregivers, and educators who are looking for high-quality toys that cater to the unique needs and interests of children. We carefully curate our collection to ensure that every toy we offer is safe, durable, and promotes active learning and development.</p>
              <div class="row gy-4 gy-md-0 gx-xxl-5X">
                <div class="col-12 col-md-6">

                </div>

              </div>
            </div>
            <div class="col-12 col-xl-11">
              <h2 class="h1 mb-3">Why Choose Kids Good Hub?</h2>
              <ul>
                <li>
                  <p class=" mb-3">Extensive Selection: We offer an extensive range of toys for children</p>
                </li>
                <li>
                  <p class=" mb-3">Quality Assurance: We prioritize the safety and quality of the toys we provide.</p>
                </li>
                <li>
                  <p class=" mb-3">Convenience: We understand that parents and caregivers have busy lives.</p>
                </li>
              </ul>


            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
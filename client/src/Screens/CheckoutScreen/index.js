import { useState, useEffect } from "react"
import useStore from "../../utils/store";
import api from "../../utils/fetcher";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CheckoutScreen() {

    const items = useStore(state => state.products)
    const [total, setTotal] = useState(0);
    const [totalWithTax, settotalWithTax] = useState(0);


    useEffect(() => {
        var calculate = 0;
        items.forEach(item => {
            calculate += item._qty * item.price;
            setTotal(calculate)
        })
        settotalWithTax(calculate + +(0.10 * calculate).toFixed(2))
        if (items.length === 0) {
            setTotal(0)
        }
    }, [items])

    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    const [shipping_address, setShippingAddress] = useState({
        address: '',
        country: '',
        state: '',
        zip: ''
    })
    const [errors, setErrors] = useState({
        address: '',
        country: '',
        state: '',
        zip: '',
        firstName: '',
        lastName: '',
        email: '',
    })




    const onCheckout = async () => {

        if (!contact.firstName || !contact.lastName || !contact.email) {
            setErrors({
                ...errors,
                firstName: !contact.firstName ? 'First Name is required' : '',
                lastName: !contact.lastName ? 'Last Name is required' : '',
                email: !contact.email ? 'Email is required' : '',
            })
            return;
        }
        if (!shipping_address.address || !shipping_address.country || !shipping_address.state || !shipping_address.zip) {
            setErrors({
                ...errors,
                address: !shipping_address.address ? 'Address is required' : '',
                country: !shipping_address.country ? 'Country is required' : '',
                state: !shipping_address.state ? 'State is required' : '',
                zip: !shipping_address.zip ? 'Zip is required' : '',
            })
            return;
        }


        const { data } = await api.post('/user/order', {
            contact,
            shipping_address,
            total_amount: totalWithTax,
            products: items.map(({ _id }) => _id)
        })
        const { status, message, order } = data;
        if (status) {
            toast('Order Created , OrderId : ' + order._id)
            window.location.href = '/';
        }
        else {
            toast(message)
        }
    }


    return (<>
        <div className="container">
            <ToastContainer />
            <div className="py-5 text-center">
                <h2>Checkout </h2>
            </div>

            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        <span className="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul className="list-group mb-3">

                        {items.map(product => {
                            return <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{product.title}</h6>
                                    <small className="text-muted">{product.categories}</small>
                                </div>
                                <span className="text-muted">${product.price}</span>
                            </li>
                        })}


                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${total}</strong>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total With Tax(USD)</span>
                            <strong>${totalWithTax}</strong>
                        </li>
                    </ul>

                    <form className="card p-2">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Promo code" />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" className="form-control" id="firstName"
                                onChange={(e) => setContact({ ...contact, firstName: e.target.value })} />
                            <div className="text-danger">
                                {errors.firstName}
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="lastName">Last name</label>
                            <input type="text" className="form-control" id="lastName"
                                onChange={(e) => setContact({ ...contact, lastName: e.target.value })} />
                            <div className="text-danger">
                                {errors.lastName}
                            </div>
                        </div>
                    </div>



                    <div className="mb-3">
                        <label for="email">Email <span className="text-muted">*</span></label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com"
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />
                        <div className="text-danger">
                            {errors.email}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label for="address">Address<span className="text-muted">*</span></label>
                        <input type="text" className="form-control" id="address"
                            placeholder="1234 Main St" onChange={(e) => setShippingAddress({ ...shipping_address, address: e.target.value })} />
                        <div className="text-danger">
                            {errors.address}
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select className="custom-select d-block w-100"
                                onChange={(e) => setShippingAddress({ ...shipping_address, country: e.target.value })}
                            >
                                <option value="">Choose...</option>
                                <option>Pakistan</option>
                            </select>
                            <div className="text-danger">
                                {errors.country}
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label for="state">State</label>
                            <select className="custom-select d-block w-100"
                                onChange={(e) => setShippingAddress({ ...shipping_address, state: e.target.value })}
                            >
                                <option value="">Choose...</option>
                                <option>Sindh</option>
                                <option>Punjab</option>
                                <option>KPK</option>
                                <option>Balochistan</option>
                            </select>
                            <div className="text-danger">
                                {errors.state}
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" className="form-control"
                                onChange={(e) => setShippingAddress({ ...shipping_address, zip: e.target.value })}
                            />
                            <div className="text-danger">
                                {errors.zip}
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="same-address" />
                        <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                    </div>

                    <hr className="mb-4" />

                    <h4 className="mb-3">Payment</h4>


                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" className="form-control" id="cc-name"
                                placeholder="" required="" />
                            <small className="text-muted">Full name as displayed on card</small>
                            <div className="invalid-feedback">
                                Name on card is required
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label for="cc-number">Credit card number</label>
                            <input type="text" className="form-control" id="cc-number"
                                placeholder="" required="" />
                            <div className="invalid-feedback">
                                Credit card number is required
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" className="form-control" id="cc-expiration"
                                placeholder="" required="" />
                            <div className="invalid-feedback">
                                Expiration date required
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label for="cc-expiration">CVV</label>
                            <input type="text" className="form-control" id="cc-cvv" placeholder=""
                                required="" />
                            <div className="invalid-feedback">
                                Security code required
                            </div>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit"
                        onClick={onCheckout}
                    >Continue to checkout</button>

                </div>
            </div>

            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">© 2023-2024 Kids Hub</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </div>
    </>)



}
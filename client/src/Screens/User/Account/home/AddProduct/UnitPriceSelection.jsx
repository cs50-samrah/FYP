import React from 'react'

export default function UnitPriceSelection({ onChange, product }) {
    return (
        <div className="form-box bg-white mt-4">
            <div className="form-box-content p-3">
                <div className="row">
                    <div className="col-md-2">
                        <label>Title <span className="required-star">*</span></label>
                    </div>
                    <div className="col-md-10">
                        <input type="text"  className="form-control mb-3"
                            name="title" placeholder="Type Here"
                            value={product.title} onChange={onChange} required />
                    </div>
                    <div className="col-md-2">
                        <label>Rent Price <span className="required-star">*</span></label>
                    </div>
                    <div className="col-md-10">
                        <input type="number" min="0" step="0.01" className="form-control mb-3"
                            name="rent_price" placeholder="Unit Price (Base Price)"
                            value={product.rent_price} onChange={onChange} required />
                    </div>
                    <div className="col-md-2">
                        <label>Purchase Price <span className="required-star">*</span></label>
                    </div>
                    <div className="col-md-10">
                        <input type="number" min="0" step="0.01" className="form-control mb-3"
                            name="purchase_price" value={product.purchase_price} onChange={onChange} placeholder="Purchase Price" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-2">
                        <label>Discount</label>
                    </div>
                    <div className="col-8">
                        <input type="number" min="0" step="0.01" className="form-control mb-3"
                            name="discount" value={product.discount} onChange={onChange} placeholder="Discount" />
                    </div>
                    <div className="col-md-2">
                        <div className="mb-3">
                            <select className="form-control selectpicker select2-hidden-accessible" name="discount_type" data-minimum-results-for-search="Infinity" tabindex="-1" aria-hidden="true">
                                <option value="amount" selected="">$</option>
                                <option value="percent">%</option>
                            </select>
                            <span className="select2 select2-container select2-container--default" dir="ltr" style={{ width: "284px" }}>
                                <span className="selection">
                                    <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-discount_type-lf-container">

                                        <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span>
                                </span>
                                <span className="dropdown-wrapper" aria-hidden="true"></span></span>
                        </div>
                    </div>
                </div>
                <div className="row" id="quantity"  >
                    <div className="col-md-2">
                        <label>Quantity <span className="required-star">*</span></label>
                    </div>
                    <div className="col-md-10">
                        <input type="number" min="0" step="1" className="form-control mb-3"
                            name="qty" value={product.qty} onChange={onChange} placeholder="Quantity" />
                    </div>
                </div>

            </div>
        </div>
    )
}

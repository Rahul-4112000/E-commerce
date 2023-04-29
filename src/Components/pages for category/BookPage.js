import { useLocation } from "react-router-dom";


const BookPage = () => {

    const location = useLocation();

    const { state: book } = location;

    let listprice = book.listPrice;
    let sellingprice = book.sellingPrice;
    let discount = parseInt((100 - (sellingprice / listprice) * 100));

    return (
        <div className="mobile-container">
            <div className="mobile-wrapper">
                <div className="mobile-img-wrapper">
                    <img src={book.url} alt="mobile"></img>
                </div>
                <div className="mobile-content-wrapper">
                    <div className="mobile-name f-bold-large">{book.name}</div>
                    <div className="mobile-selling-price ">Best Price* <span className='f-bold-large'>&#8377;{book.sellingPrice}</span> </div>
                    <div className='list-discount-price'>
                        <span className="mobile-list-price">MRP <s>&#8377;{book.listPrice}</s></span>
                        <span className="mobile-dicount-price f-bold-red">GET {discount}% off</span>
                    </div>
                    <div className='mobile-delivery f-bold-red'>{book.delivery}</div>
                    <div className="disclaimer">
                        <p>
                            Inclusive of all taxes <br /> *This product cannot be returned for a refund or exchange.<br />
                        </p>
                    </div>
                    <div className="add-to-cart placeorder-button">ADD TO CART</div>
                    <hr />
                    <div className="highlight-wrapper d-flex-mb-20">
                        <div className="highlight-text no-shrink-grey-text">Highlights</div>
                        <ul>
                            {
                                book.highlights.map((highlight,index) => {
                                    return (
                                        <li key={index}><span>&#8226;</span> {highlight}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="d-flex-mb-20">
                        <div className="no-shrink-grey-text">Author</div>
                        <div className="">{book.author}</div>
                    </div>
                    <div className="seller-wrapper d-flex-mb-20">
                        <div className="seller-text no-shrink-grey-text">Seller</div>
                        <div className="seller-name">{book.seller}</div>
                    </div>
                    <div className="description-wrapper d-flex-mb-20">
                        <div className="description-text no-shrink-grey-text">Description</div>
                        <div>{book.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage;
import './Electronics.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Fashion = () => {

  const navigate = useNavigate();

  const { apiData : Products } = useSelector((state)=> state.product);

  const { Fashion } = Products;

  return (
    <div className='categories-wrapper'>

      {
        Fashion.map((categoryItem,index) => {

          let listprice = categoryItem.listPrice;
          let sellingprice = categoryItem.sellingPrice;
          let discount = parseInt((100 - (sellingprice / listprice) * 100));

          return (
            <div className='categories' key={index} onClick={()=>{ navigate("/dynamicPage",{state:categoryItem}) }}>
              <div className="categories-detail">
                <img src={categoryItem.url} alt="categories-items"></img>
                <div className="category-item-name">{categoryItem.name}</div>
                <div className="category-item-selling-price">Best price &#8377;{categoryItem.sellingPrice}</div>
                <div className="category-item-list-price">MRP<s> &#8377;{categoryItem.listPrice}</s></div>
                <div className="category-item-discount">{discount}% off</div>
                <div className="category-item-delivery">{categoryItem.delivery}</div>
              </div>
            </div>
          );
        })
      }

    </div>
  )
}

export default Fashion;
import './Category.css';
import { Link } from 'react-router-dom';

const Category = ({ categories }) => {

    return (
        categories.map((item, index) =>

            <div className="category" key={index}>
                <Link to={item.link}>
                    <img src={item.url} alt="category-icon"></img>
                    <div className="category-text" >{item.categoryName}</div>
                </Link>
            </div>

        ));
}

export default Category;
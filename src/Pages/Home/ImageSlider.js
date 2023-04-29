import { useEffect, useState } from "react";
import './ImageSlider.css'
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";


const ImageSlider = () => {

    const navigate = useNavigate();

    const slidingImages = [{
        id: "1",
        url: "https://preview.colorlib.com/theme/fashe/images/master-slide-02.jpg.webp",
        itemNumber: "3",
        collectionName:'Women',
        categoryName:'Fashion'
    }, {
        id: "2",
        url: "https://wallpaper.dog/large/5528687.jpg",
        itemNumber: "5",
        collectionName: "Toys",
        categoryName:'Toys'
    }, {
        id: "3",
        url: "https://miro.medium.com/v2/resize:fit:1400/0*JyHi-9QIN2nHXLaw",
        itemNumber: 5,
        collectionName: "Men",
        categoryName:'Fashion'
    },];

    const [imgCurrentindex, setImgCurretindex] = useState(0);

    const gotoPrevious = () => {
        imgCurrentindex === 0 ? setImgCurretindex(slidingImages.length - 1) : setImgCurretindex(imgCurrentindex - 1);
    }

    const gotoNext = () => {
        imgCurrentindex < slidingImages.length - 1 ? setImgCurretindex(imgCurrentindex + 1) : setImgCurretindex(0);
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            
            if (imgCurrentindex !== slidingImages.length - 1)

                setImgCurretindex(imgCurrentindex + 1);

            else

                setImgCurretindex(0);

        }, 3000);

        return () => clearTimeout(timer);

    }, [imgCurrentindex]);

    return (
        <div className="image-slider center-x" >
            <div className="left arrow" onClick={() => gotoPrevious()}><AiOutlineLeftCircle /></div>
            <div className="right arrow" onClick={() => gotoNext()}><AiOutlineRightCircle /></div>
            {
                slidingImages.map((Category, slideIndex) => {
                    return (
                        <div key={slideIndex} className='slide' style={{ backgroundImage: `url(${Category.url})`, marginLeft: slideIndex === 0 && `-${imgCurrentindex * 100}%` }}>
                            <div>{Category.collectionName} Collection</div>
                            <h2> NEW ARRIVAL </h2>
                            <div className="shop-now" onClick={() => { navigate('/newarrival',{ state : Category })} }> SHOP NOW </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ImageSlider;
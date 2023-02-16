import mobiles from '../../assets/images/Categories/phone.png';
import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import travel from '../../assets/images/Categories/travel.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import { Link } from 'react-router-dom';
import './Categories.css'

const catNav = [
    {
        name: "Mobiles",
        icon: mobiles,
    },
    {
        name: "Fashion",
        icon: fashion,
    },
    {
        name: "Electronics",
        icon: electronics,
    },
    {
        name: "Home",
        icon: home,
    },
    {
        name: "Travel",
        icon: travel,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Furniture",
        icon: furniture,
    },
    {
        name: "Beauty,Toys & more",
        icon: beauty,
    },
    {
        name: "Grocery",
        icon: grocery,
    },
]



const Categories = () => {
    return (
        <section className='main'>
            <div className='maini'>
                {catNav.map((item, i) => {
                    return  (
                        <Link to={`/product?category=${item.name}`}  key={i} className="flex items-center justify-between ">
                            <div className='pro'>
                                <img  className='pro' src={item.icon} alt={item.name} />
                            </div>
                            <span>{item.name}</span>
                        </Link>
                    )

                })}
            </div>
        </section>
    )
}

export default Categories
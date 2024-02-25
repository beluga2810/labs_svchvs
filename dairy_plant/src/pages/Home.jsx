import Footer from './../components/Footer'
import AboutUs from '../components/AboutUs';
import './../styles/home.css';

const Home = () => {
    return ( 
        <>
             <AboutUs/>
             <div className="features">
                <h2>Преимущества выбора нашей комбината</h2>
                <ul>
                <li>Качество и свежесть продукции</li>
                 <li>Широкий ассортимент молочной продукции</li>
                 <li>Профессиональное производство и контроль качества</li>
                 <li>Надежная система учета и отслеживания продукции на складе</li>
                </ul>
            </div>
            <Footer/>
        </>
     );
}
 
export default Home;
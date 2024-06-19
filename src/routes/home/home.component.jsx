import Directory from '../../components/directory/directory';
import categories from '../../components/catergories-array/categories-array.items';


const Home = () => {
    return (
        <Directory categories={categories} />
    )
}

export default Home;
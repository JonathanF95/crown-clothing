import './components/category-item/category-item.styles.scss'
import './categories.styles.scss'
import categories from './components/catergories-array/categories-array.items'
import Directory from './components/directory/directory'


const App = () => {

  return (
  <Directory categories={categories}/>
  )
}

export default App;

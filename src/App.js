import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddProductItem from './AddProductItem';

const products = [
  {
    id: 1,
    name: "iphone",
    price: 100000
  },
  {
    id: 2,
    name: "Q mobile G3",
    price: 70000
  }
]
localStorage.setItem('products', JSON.stringify(products));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }
  componentWillMount() {
    const products = this.getProducts();
    this.setState({products});
  }
  getProducts(){
    return this.state.products;
    // console.log(products);
    // this.setState({ products });
  }
  addProduct(name , price){
    const products = this.getProducts();
    products.push({
      name,
      price
    })
    this.setState({products});
    localStorage.setItem('products', JSON.stringify(products));
  }
  editProduct(name , price , defaultName){
    let products = this.getProducts();
    products = products.map(product => {
      if(product.name === defaultName){
        product.name = name;
        product.price = price;
      }
      return product;
    })
    
    this.setState({products });
    localStorage.setItem('products', JSON.stringify(products));

  }
  deleteProduct(name){
    const products = this.getProducts();
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    this.setState({products: filteredProducts });
    localStorage.setItem('products', JSON.stringify({products:filteredProducts}));
  }
  

  render() {
    return (
      <div className="App">
        <h1>Simple CRUD App</h1>

      <AddProductItem
      onAdd={this.addProduct}
      />

        {
          this.state.products.map(product => {
            return (
              < ProductItem 
              key={product.name}
              {...product}
              onDelete={this.deleteProduct}
              onEditSubmit={this.editProduct}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;

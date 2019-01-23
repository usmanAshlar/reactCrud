import React, { Component } from 'react';

class ProductItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }
        this.onEdit = this.isEditProduct.bind(this);
        this.onDelete = this.deleteProduct.bind(this);
        this.onEditSubmit = this.editProduct.bind(this);
    }
    editProduct(event){
        event.preventDefault();
        this.props.onEditSubmit(this.nameInput.value , this.priceInput.value , this.props.name);
 this.setState({ isEdit:false })
    }
    isEditProduct() {
        this.setState({ isEdit: true })
    }
    deleteProduct() {
        const { name, onDelete } = this.props;
        onDelete(name);
    }
    render() {
        const { name, price } = this.props;
        return (

            <div >
                {
                    this.state.isEdit ?
                        (
                            <form onSubmit={this.onEditSubmit}>
                            <input placeholder="Product Name"  ref={nameInput => this.nameInput = nameInput} 
                            defaultValue={name}/>
                            <input placeholder="Product Price" ref={priceInput => this.priceInput = priceInput} 
                            defaultValue={price}
                            />
                            <button>Save</button>
                            <hr/>
                        </form>
                        ): (
                                <div>
                                  <span>{ name }</span>
                                 {` | `}
                <span>{price} </span>
                <button onClick={this.onEdit}> Edit  </button>
                <button onClick={this.onDelete}> Delete  </button>
            </div>
        )
    }
          
            </div>

        );
    }
}

export default ProductItem;

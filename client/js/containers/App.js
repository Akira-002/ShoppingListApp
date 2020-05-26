import React, { Component } from 'react';
import { connect } from 'react-redux';

//actions
import { fetchProducts, createProduct, deleteProduct } from '../actions/productActions';

//material-ui objects
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

// bindActionCreatorsのaction objectをpropsとして返す
const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        createProduct: (name) => dispatch(createProduct(name)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
    };
}

// Components(Container)にStateとして渡す
// combineReducersでネストされているためProductsStateとする
const mapStateToProps = (state) => {
    const products = state.ProductsState.products;
    const product = state.ProductsState.product;
    return {
        products: products,
        product: product,
    }
}

const ProductList = ({products, handleCheck}) => {
    return(
        <div>
            {products.map((product) =>
                <div className="listItem" key={product.id}>
                    <Checkbox
                        key={product.id}
                        name={String(product.id)}
                        onChange={handleCheck}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <span>{product.name}</span>
                </div>
            )}
        </div>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedId: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleClickToCreate = this.handleClickToCreate.bind(this);
        this.handleClickToDelete = this.handleClickToDelete.bind(this);
    }

    // server-side rendering時には必要ない初期化処理についてはcomponentDidMountでやる
    componentDidMount() {
        this.props.fetchProducts();
    }

    handleChange(event) {
        const product = this.state;
        this.setState({
            ...product,
            [event.target.name]: event.target.value
            // = name: event.target.value
        });
    }

    handleCheck(event) {
        const arrayId = Number(event.target.getAttribute('name'));
        this.setState(state => {
            const foundIndex = state.checkedId.indexOf(arrayId)
            if (state.checkedId.find(element => element == arrayId)) {
                return state.checkedId.splice(foundIndex, 1);
            } else {
                return state.checkedId.push(arrayId);
            }
        });
    }

    handleClickToCreate() {
        const product = this.state;
        if(product.name === '') {
            return;
        } else {
            return this.props.createProduct({name: product.name});
        }
    }

    handleClickToDelete() {
        this.setState(state => {
            if(state.checkedId.length > 0) {
                for(var i = 0; i < state.checkedId.length; i++){
                    const idToDelete = state.checkedId[i];
                    this.props.deleteProduct({id: idToDelete});
                }
                state.checkedId = [];
            } else {
                return;
            }
        });
    }

    render() {
        return(
            <div className="appPane">
                <div id="addFormPane">
                    <TextField
                        id="outlined-basic"
                        name="name"
                        label="Name of products"
                        onChange={this.handleChange}
                        variant="outlined"/>
                    <Button onClick={this.handleClickToCreate}>
                        Add
                    </Button>
                </div>
                <div className="itemListPane">
                    { this.props.products ?
                        <ProductList products={this.props.products} checkedId={this.state.checkedId} handleCheck={this.handleCheck}/> : null
                    }
                </div>
                <div className="checkButton">
                    <Button id="button-cheked" onClick={this.handleClickToDelete}>
                        CHECKED
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
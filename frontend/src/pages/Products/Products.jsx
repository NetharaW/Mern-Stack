import React,{useState,useEffect} from "react";
import Header from "../../components/Header";
import { EmptyComponent } from "../../components/Empty";
import { Container,Row,Col,Button } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import ProductModal from "./ProductModal";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";

const Products = () => {
    const sampleProducts = [];

    const [showModal,setShowModal] = useState(false);
    const [editItem,setEditItem] = useState(null);

    const dispatch = useDispatch();

    const{item,loading} = useSelector((state)=> state.products);

    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd=() => {
      //setEditItem
      setEditItem(null);
      //setShowModal
      setShowModal(!showModal);
    };

    const handleEdit = (product) => {
      setEditItem(product);
      setShowModal(true);
    }

    const handleDelete = (id) => {
      //dispatch delete product
    }

    const handleSubmit = () =>{
      if(editItem) {
        //dispatch update product action
      }else {
        //dispatch add product
      }
    }
        /*{
            id:1,
            name:"Wireless Headphones",
            description: "Noise cancelling over-ear headphone",
            banner:
            "https://res.cloudinary.com/da3w329cx/image/upload/v1683056487/samples/landscapes/nature-mountains.jpg",
            price:120,
        },
        {
                id:2,
                name:"Smart Watch",
                description:"Smart wearable with health tracking",
                 banner:
    "https://res.cloudinary.com/da3w329cx/image/upload/v1683056500/cld-sample-5.jpg",
                price:80,        
            },
{
    id:3,
    name:"Laptop",
    description:"14-inch Full HD display, 256GB SSD",
    banner: "https://res.cloudinary.com/da3w329cx/image/upload/v1683056499/cld-sample-3.jpg",
    price:600,
},
    ];*/

return(
<>
    <section>
        <Header />
        {loading && <div>fetching data...</div>}
        <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
{/*<AddProduct/>*/}

        < Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-circle me-2"></i>Add Product
        </Button>

        </div>

    {
    sampleProducts.length === 0 ? ( 
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "200px" }}
      >
        <EmptyComponent message="We're currently out of stock" /> 
        </div>
        ) : (
      <Row className="g-4">
        {sampleProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
            <ProductCard 
              product={product}  
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDelete(product.id)}
            />
          </Col>
        ))}
      </Row>
    )}

    </Container>
    <ProductModal 
    show={showModal} 
    onClose={() => setShowModal(!showModal)}
    initialValues={editItem || {
      title: "",
      image: "",
      description: "",
      price:0,
    }
  }
  onSubmit={handleSubmit}
    />
  </section>
  </>
  );
};

export default Products;
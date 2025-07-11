import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../../redux/actions/productActions";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import ProductModal from '../../components/ProductModal';
import EmptyComponent from '../../components/EmptyComponent';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  console.log("Fetched product items:", items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSubmit = (values) => {
    if (editItem) {
      dispatch(updateProduct(editItem._id, values));
    } else {
      dispatch(addProduct(values));
    }
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <section>
      <Header />

      <Container className="mt-4">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={handleAdd}>
            <i className="bi bi-plus-circle me-2"></i>Add Product
          </Button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-50">
            <Spinner animation="border" role="status">
             <Skeleton count={5}/>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          items && items.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <EmptyComponent message="We're currently out of stock" />
            </div>
          ) : (
            <Row className="g-4">
              {items && items.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={3} lg={3}>
                  <ProductCard
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDelete(product._id)}
                  />
                </Col>
              ))}
            </Row>
          )
        )}
      </Container>

      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        product={editItem}
      />
    </section>
  );
};

export default Products;

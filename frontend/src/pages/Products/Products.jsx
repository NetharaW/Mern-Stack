import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../redux/actions/productActions";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Don't forget to import the CSS!

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'; // Keep Spinner if you still want it for very quick loads or as a fallback
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

  // Helper component for a skeleton product card
  const SkeletonProductCard = () => (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Skeleton height={150} /> {/* Image placeholder */}
      <Skeleton count={2} style={{ marginTop: '10px' }} /> {/* Title and Price */}
      <Skeleton width={80} style={{ marginTop: '10px' }} /> {/* Button placeholder */}
    </div>
  );

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
          // Display a grid of skeleton cards while loading
          <Row className="g-4">
            {Array.from({ length: 8 }).map((_, index) => ( // Render 8 skeleton cards
              <Col key={index} xs={12} sm={6} md={3} lg={3}>
                <SkeletonProductCard />
              </Col>
            ))}
          </Row>
        ) : (
          // After loading, check if items are empty or render them
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

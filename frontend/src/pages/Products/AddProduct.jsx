import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ProductModal from "./ProductModal";

const AddProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    banner: "",
    description: "",
    price: "",
  });

  const handleSubmit = () => {
    console.log("Submitted product:", formData);
    setShowModal(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus-circle me-2"></i>Add Product
      </Button>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        title="Add New Product"
        submitLabel="Save"
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter banner URL"
              value={formData.banner}
              onChange={(e) =>
                setFormData({ ...formData, banner: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </ProductModal>
    </>
  );
};

export default AddProduct;

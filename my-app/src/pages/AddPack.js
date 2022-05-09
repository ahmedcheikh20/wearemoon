import React, { useState,useEffect } from "react";
import axios from "../api/axios";
import { Row, Col, Form, Button, Container, Badge } from "react-bootstrap";

const AddPack = () => {
  const [packName, setPackName] = useState("");
  const [packProducts, setProducts] = useState([]);
  const [productList, setProductList] = useState([])

  useEffect(() => {
    axios
      .get("products", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((rst) => {
        setProductList(rst.data);
      })
      .catch((err) => {
        setProductList([]);
      });
  }, []);
 

  const handleDeleteBadge = (e) => {
    const options = document.querySelectorAll("option");
    const selected = [...options].filter((option) => option.disabled);
    const undisabledProduct = selected.find(
      (elem) => elem.value === e.target.innerText
    );
    undisabledProduct.disabled = false;

    let prod = [...packProducts];
    let filteret = prod.filter((element) => element.id !== e.target.id);
    setProducts(filteret);
  };
  const handleSelect = (e) => {
    
    setProducts((prevState) => [...prevState, {id:e.target[e.target.selectedIndex].id,name:e.target.value}]);
    return (e.target.selectedOptions[0].disabled = true);
  };
  return (
    <Container className="mx-auto w-50 mt-5 ">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Pack Name</Form.Label>
              <Form.Control type="email" placeholder="Enter Pack Name" />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Product</Form.Label>
              <Form.Select onChange={handleSelect}>
                {productList.map((item, index) => {
                  return (
                    <option key={index} id={item.id} value={item.name} >
                      {item.title}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <div>
              {packProducts?.map((item, index) => {
                return (
                  <Badge
                    bg="primary"
                    key={index}
                    onClick={handleDeleteBadge}
                    id={item.id}
                  >
                    {item.name}
                  </Badge>
                );
              })}
            </div>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control type="email" placeholder="Enter Pack Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control type="email" placeholder="Enter Pack Name" />
            </Form.Group>
            <Button className="mt-3">Add</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AddPack;

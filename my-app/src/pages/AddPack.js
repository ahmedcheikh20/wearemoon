import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";

const AddPack = () => {
  const [packProducts, setProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");
  const navigate = useNavigate();
  const formData = createRef();
  const [error, setError] = useState("");

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
    setProducts((prevState) => [
      ...prevState,
      { id: e.target[e.target.selectedIndex].id, name: e.target.value },
    ]);
    return (e.target.selectedOptions[0].disabled = true);
  };

  const picInput = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      return setLoading(false);
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "freemarket");
      data.append("cloud_name", process.env.REACT_APP_cloud_name);
      fetch(process.env.REACT_APP_CLOUDINARY, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);

      return;
    }
  };

  const add = async (event) => {
    event.preventDefault();
    const products = packProducts.map((element) => element.id);
    const newPack = {
      title: formData.current.product_name.value,
      price: Number(formData.current.price.value),
      description: formData.current.description.value,
      image: pic,
      products: products,
    };

    try {
      if (packProducts.length >= 1) {
        await axios.post("packs", JSON.stringify(newPack), {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        navigate("/packs", { replace: true });
      } else {
        setError("At least one product ");
      }
    } catch (err) {
      setError("Bad request");
    }
  };

  return (
    <Container className="mx-auto w-50 mt-5 ">
      <h1 className="text-center">Add Pack</h1>
      <Row>
        <Col>
          <Form onSubmit={add} ref={formData}>
            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              name="product_name"
            >
              <Form.Label>Pack Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pack Name"
                // onChange={(e) => setPackName(e.target.value)}
                name="product_name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Product</Form.Label>
              <Form.Select onChange={handleSelect} required>
                {productList.map((item, index) => {
                  return (
                    <option key={index} id={item.id} value={item.name}>
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

            <Form.Group className="mb-3" controlId="formGridEmail" name="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                required
              />
            </Form.Group>
            <Form.Group md="4" controlId="formBasicQty" name="image">
              <Form.Label>Photo:</Form.Label>
              <Form.Control
                type="file"
                placeholder="description"
                name="image"
                onChange={(e) => picInput(e.target.files[0])}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="Description"
              name="description"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Description"
                as="textarea"
                rows={3}
                name="description"
              />
            </Form.Group>

            <Button className="mt-3" type="submit">
              {" "}
              {loading ? <Spinner animation="border" /> : "Add"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Alert>{error}</Alert>
    </Container>
  );
};
export default AddPack;

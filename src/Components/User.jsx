import React, { useState } from "react";
import Delete from "./xwhite.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import useForm from "react-hook-form";

export default function User(props) {
  const [firstname, setFirstname] = useState(props.firstname);
  const [lastname, setLastname] = useState(props.lastname);
  const [email, setEmail] = useState(props.email);
  const [tel, setTel] = useState(props.tel);
  const [postcode, setPostcode] = useState(props.postcode);
  const [deleted, setDeleted] = useState(false);
  const [modalShow, setModal] = useState(false);

  function handleDelete(e) {
    fetch(
      "https://kea3rdsemester-91fd.restdb.io/rest/subscribers/" +
        e.target.dataset.id,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5d887df9fd86cb75861e2626",
          "cache-control": "no-cache"
        }
      }
    )
      .then(res => res.json())
      .then(setDeleted(true));
  }

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      tel: tel,
      postcode: postcode
    };

    const postData = JSON.stringify(data);
    fetch(
      "https://kea3rdsemester-91fd.restdb.io/rest/subscribers/" + props.id,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5d887df9fd86cb75861e2626",
          "cache-control": "no-cache"
        },
        body: postData
      }
    )
      .then(res => res.json())
      .then(setModal(false));
  };

  if (!deleted) {
    return (
      <>
        <tr className="user-section">
          <td className="fullname">{firstname}</td>
          <td>{lastname}</td>
          <td className="email">{email}</td>
          <td className="tel">{tel}</td>
          <td className="postcode">{postcode}</td>
          <td>
            <Button
              className="edit-btn"
              onClick={() => setModal(true)}
              variant="outline-primary"
            >
              Edit
            </Button>
          </td>
          <td>
            <img
              className="delete"
              onClick={handleDelete}
              src={Delete}
              alt="Delete"
              data-id={props.id}
            />
          </td>
        </tr>

        <Modal
          show={modalShow}
          onHide={() => setModal(false)}
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Col>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    name="firstname"
                    defaultValue={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    ref={register({
                      required: true
                    })}
                  />
                  {errors.firstname && (
                    <p className="error-msg">This is required</p>
                  )}
                </Col>
                <Col>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    name="lastname"
                    defaultValue={lastname}
                    onChange={e => setLastname(e.target.value)}
                    ref={register({
                      required: true
                    })}
                  />
                  {errors.lastname && (
                    <p className="error-msg">This is required</p>
                  )}
                </Col>
              </Form.Row>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                defaultValue={email}
                onChange={e => setEmail(e.target.value)}
                ref={register({
                  required: "This is required",
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="error-msg">{errors.email.message}</p>
              )}
              <Form.Label>Tel.</Form.Label>
              <Form.Control
                name="tel"
                defaultValue={tel}
                onChange={e => setTel(e.target.value)}
                ref={register({
                  required: true
                })}
              />
              {errors.tel && <p className="error-msg">This is required</p>}
              <Form.Label>Postal code</Form.Label>
              <Form.Control
                name="postcode"
                defaultValue={postcode}
                onChange={e => setPostcode(e.target.value)}
                ref={register({
                  required: "This is required",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "It must contain 4 numbers"
                  },
                  minLength: {
                    value: 4,
                    message: "It must contain 4 numbers"
                  },
                  maxLength: {
                    value: 4,
                    message: "It must have no more than 4 numbers"
                  }
                })}
              />
              {errors.postcode && (
                <p className="error-msg">{errors.postcode.message}</p>
              )}
              <Modal.Footer>
                <img
                  className="delete"
                  onClick={handleDelete}
                  src={Delete}
                  alt="Delete"
                />
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return null;
  }
}

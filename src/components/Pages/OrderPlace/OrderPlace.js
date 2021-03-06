import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useForm } from "react-hook-form";
import "./OrderPlace.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const OrderPlace = () => {
  const history = useHistory();
  const url = "/myOrders";
  const { user } = useAuth();
  const { id } = useParams();
  const [orders, setOrders] = useState({});

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    delete data._id;
    // post order
    axios.post("https://stormy-basin-87659.herokuapp.com/reviewOrder", data).then((res) => {
      if (res.data.insertedId) {
        alert("We have received your order. Please complete the order by reviewing");
      }
      reset();
      history.push(url);
    });
  };
  useEffect(() => {
    const url = `https://stormy-basin-87659.herokuapp.com/orderPlace/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        reset(data);
      });
  }, [id, reset]);

  return (
    <div className="mt-5 container">
      <div className="pt-5 text-center orderPlace">
        <div className="card border-0 mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <img style={{ width: "200px" }} src={orders.img} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-5">
              <div className="card-body">
                <h5 className="card-title text-start">{orders.name}</h5>
                <p className="card-text lead text-start">{orders.desc}</p>
                <p className="card-text">
                  <small className="text-muted fs-5">
                    <span className="fw-bold text-dark">$ {orders.price}</span> / Per {orders.shift}
                  </small>
                </p>
              </div>
            </div>
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="border-0 border-bottom"
                defaultValue={orders.name}
                type="text"
                {...register("name", { required: true, maxLength: 20 })}
              />
              <input className="border-0 border-bottom" defaultValue={user?.email} type="text" {...register("email", { required: true })} />
              <textarea className="border-0 border-bottom" defaultValue={orders?.desc?.slice(0, 100)} {...register("desc", { required: true })} />
              <input className="border-0 border-bottom" defaultValue={orders.subName} {...register("subName", { required: true })} />
              <input className="border-0 border-bottom" defaultValue={orders.shift} {...register("shift", { required: true })} />
              <input className="border-0 border-bottom" defaultValue={orders.img} {...register("img", { required: true })} />
              <input className="border-0 border-bottom" defaultValue={orders.price} type="number" {...register("price", { required: true })} />
              <input
                className="border-0 border-bottom"
                placeholder="Phone Number"
                type="number"
                {...register("phone", { required: true, maxLength: 20 })}
              />
              <textarea className="border-0 border-bottom" placeholder="Address" {...register("address", { required: true, maxLength: 50 })} />
              <input className="border-0 border-bottom bg-custom-color text-white" value="Order Now" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlace;

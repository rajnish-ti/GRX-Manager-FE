import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.scss";
import { GRXForm, validateSelector } from "./AddGrx";

const EditGrx = () => {
  const [initValue, setInitValue] = useState(null);
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadList = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/grx/grxId/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setInitValue(data.data);
      setLoading(false);
    };
    loadList();
  }, []);

  const onSubmit = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`http://localhost:5000/grx/updateGrx/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        selector: validateSelector(formData.selector),
      }),
    });
    const data = await response.json();
    console.log("data", data);
    if (data.s) {
      message.success("Grx Updated Successfully");
      navigate("/");
    } else {
      message.error("Something went wrong");
    }
    setLoading(false);
  };

  if (loading && !initValue) {
    return <Spin />;
  }
  return (
    <GRXForm onSubmit={onSubmit} loading={loading} initialValue={initValue} />
  );
};

export default EditGrx;

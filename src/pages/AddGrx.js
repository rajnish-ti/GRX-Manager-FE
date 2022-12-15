/* eslint-disable react/prop-types */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.scss";
import { channel } from "./GrxList";

const ADDGrx = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:5000/grx/addGrx", {
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
    if (data.s) {
      message.success("Grx Added Successfully");
      navigate("/");
    } else {
      message.error("Something went wrong");
    }
    setLoading(false);
  };

  return <GRXForm onSubmit={onSubmit} loading={loading} />;
};

export const GRXForm = ({ onSubmit, loading, initialValue }) => {
  const [formData, setFormData] = useState(() => {
    if (initialValue) {
      return initialValue;
    }
    return initialState("click");
  });

  console.log("form data", formData);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="container" onSubmit={(e) => onSubmit(e, formData)}>
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>GRX Trigger Configuration</h3>
        <Link to="/">
          <Button icon={<ArrowLeftOutlined />}>Back</Button>
        </Link>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", marginRight: "20px" }}>
          <label htmlFor="trigger_type">Trigger Type</label>
          <select
            name="trigger_type"
            onChange={(e) => setFormData({ ...initialState(e.target.value) })}
          >
            <option value="click">Click</option>
            <option value="view">View</option>
          </select>
        </div>
        <div style={{ width: "30%" }}>
          <label htmlFor="channel">Channel</label>
          <select
            name="channel"
            value={formData.channel}
            onChange={handleChange}
          >
            {channel.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", marginRight: "20px" }}>
          <label htmlFor="identifier">Identifier</label>
          <br />
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            placeholder="Enter Identifier"
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "30%" }}>
          <label htmlFor="platform">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
          >
            <option value="both">Both</option>
            <option value="web">Web</option>
            <option value="pwa">PWA</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", marginRight: "20px" }}>
          <label htmlFor="type-selector">Selector Type</label>
          <select name="selector_type" onChange={handleChange}>
            <option value="first_selector">First Selector</option>
            <option value="all_selector">All Selector</option>
          </select>
        </div>
        <div style={{ width: "30%" }}>
          <label htmlFor="template">Template</label>
          <select
            name="template"
            value={formData.template}
            onChange={handleChange}
          >
            <option value="all">All Template</option>
            <option value="articleshow">Article Show</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        Fire the trigger when an event occurs and all of these conditions are
        true
      </div>
      <div>
        <input
          type="text"
          name="selector"
          value={formData.selector}
          placeholder="Enter Selector"
          onChange={handleChange}
          required
        />
      </div>
      <input
        type="text"
        name="grxKey"
        value={formData.grxKey}
        placeholder="Enter property"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="grxValue"
        placeholder="Enter value"
        value={formData.grxValue}
        onChange={handleChange}
        required
      />
      <div className="button-container">
        <input type="submit" value="Submit" disabled={loading} />
      </div>
    </form>
  );
};

const initialState = (key) => {
  return {
    trigger_type: key === "click" ? "click" : "view",
    selector_type: "first_selector",
    platform: "both",
    template: "all",
  };
};

export const validateSelector = (selector) => {
  let data = selector;
  if (data && data.substring(0, data.indexOf(">")).includes("#")) {
    const i = data.indexOf(">") + 2;
    data = data.slice(i, data.length);
  }
  return data;
};

export default ADDGrx;

import {
  Button,
  Col,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { triggerTypeList } from "./constants";

import "./GrxList.scss";

const GrxList = () => {
  const [inputValue, setInputValue] = useState("lang");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const loadList = async () => {
    setLoading(true);
    const url =
      "http://localhost:5000/grx/grxList?" +
      new URLSearchParams({ channel: inputValue || "lang" });
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setResponse(data);
    setLoading(false);
  };

  useEffect(() => {
    loadList();
  }, [inputValue]);

  const confirm = async (e) => {
    console.log(e);
    const response = await fetch(
      `http://localhost:5000/grx/deleteGrx/${e._id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.s) {
      message.success("Grx Deleted Successfully");
      loadList();
    } else {
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Identifier",
      dataIndex: "identifier",
      key: "identifier",
      render: (text, { _id }) => <Link to={`/updateGrx/${_id}`}>{text}</Link>,
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      render: (text) => <span>{text && text.toUpperCase()}</span>,
    },
    {
      title: "Trigger Type",
      dataIndex: "trigger_type",
      key: "trigger_type",
      render: (text) => <span>{text && text.toUpperCase()}</span>,
      filters: triggerTypeList,
      onFilter: (value, record) => {
        console.log("data", record, value);
        return record["trigger_type"].indexOf(value) === 0;
      },
    },
    {
      title: "Property",
      dataIndex: "grxKey",
      key: "grxKey",
      render: (text) => <span>{text && text.toUpperCase()}</span>,
    },
    {
      title: "Value",
      dataIndex: "grxValue",
      key: "grxValue",
    },
    {
      title: "Platform",
      key: "platform",
      dataIndex: "platform",
      render: (_, { platform }) => {
        let val = [platform];
        if (platform === "both") {
          val = ["web", "pwa"];
        }
        return (
          <>
            {val.map((tag) => {
              let color = tag === "web" ? "geekblue" : "green";
              return (
                <Tag color={color} key={tag}>
                  {tag && tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        );
      },
      // filters: platformList,
      // onFilter: (value, record) => {
      //   if (value === "both") {
      //     return true;
      //   }
      //   return record["platform"].indexOf(value) === 0;
      // },
    },
    {
      title: "Template",
      dataIndex: "template",
      key: "template",
      render: (text) => <span>{text && text.toUpperCase()}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span className="edit">
            <Link to={`/updateGrx/${record._id}`}>Edit</Link>
          </span>
          <Popconfirm
            title="Are you sure to delete this GRX?"
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <span className="delete">Delete</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={22}>
          <Select
            showSearch
            placeholder="Select channel"
            optionFilterProp="children"
            onChange={(val) => setInputValue(val)}
            defaultValue="lang"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: "250px" }}
            options={channel}
          />
        </Col>
        <Col span={2}>
          <Link to={`/add`}>
            <Button type="primary" block>
              Add GRX
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={response?.data ? [...response?.data] : []}
        size="small"
        pagination={{ pageSize: 20 }}
        loading={loading && !response}
        bordered
        scroll={{ y: "65vh" }}
      />
    </>
  );
};

export const channel = [
  {
    value: "lang",
    label: "Languages",
  },
  {
    value: "nbt",
    label: "NBT",
  },
  {
    value: "eisamay",
    label: "Eisamay",
  },
  {
    value: "tml",
    label: "Tamil",
  },
  {
    value: "tlg",
    label: "Telgu",
  },
  {
    value: "mly",
    label: "Malyalam",
  },
  {
    value: "mt",
    label: "Maharashtra",
  },
  {
    value: "vk",
    label: "Vijay Karnataka",
  },
  {
    value: "iag",
    label: "Gujarat",
  },
];

export default GrxList;

/* eslint-disable react/prop-types */
import { Typography, Table } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }
`;

function TableComp({ dateRange, data, totalBill }) {
  const [totalMultiplier, setTotalMultiplier] = useState(0);

  useEffect(() => {
    setTotalMultiplier(
      data
        .reduce((sum, data) => sum + Number(data.multiplier), 0)
        .toLocaleString(undefined, { minimumFractionDigits: 4 })
    );
  }, [data]);

  const columns = [
    {
      key: "id",
      title: "#",
      render: (_, doc, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "days_billed",
      title: "Days Billed",
      dataIndex: "days_billed",
    },
    {
      key: "multiplier",
      title: "Bill",
      render: (_, doc) => {
        return (
          <p>
            {Number(
              ((totalBill / totalMultiplier) * doc.multiplier).toLocaleString()
            ).toFixed(2)} php
          </p>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <div className="text-container">
        <Typography>
          Bill Date Range:{" "}
          <strong>
            {dateRange[0].format("MMM DD, YYYY")} —{" "}
            {dateRange[1].format("MMM DD, YYYY")}
          </strong>
        </Typography>
        <Typography>
          {" "}
          Number of Billed Days:{" "}
          <strong>{dateRange[1].diff(dateRange[0], "days") + 1}</strong>
        </Typography>
        <Typography>
          {" "}
          Total Bill: <strong>{Number(totalBill).toLocaleString()}</strong>
        </Typography>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ marginBottom: "2.5rem" }}
        size="small"
      />
    </Wrapper>
  );
}

export default TableComp;

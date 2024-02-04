/* eslint-disable react/prop-types */
import { Button, Form, Input, Typography, message } from "antd";
import styled from "styled-components";

const Wrapper = styled.div`
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
  }

  .ant-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
  }
`;

function FormComp({ data, setData, dateRange, totalBill }) {
  const [form] = Form.useForm();

  const handleSubmit = (value) => {
    if (data.find((d) => d.name.toLowerCase() === value.name.toLowerCase())) {
      message.error(
        `Data for ${value.name.slice(0, 1).toUpperCase()}${value.name.slice(
          1
        )} has already been entered.`
      );

      return;
    }
    setData((data) => [
      ...data,
      {
        ...value,
        multiplier: Number(
          value.days_billed / (dateRange[1].diff(dateRange[0], "days") + 1)
        ).toLocaleString(undefined, { minimumFractionDigits: 4 }),
      },
    ]);
    form.resetFields();
  };

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
      <Form onFinish={handleSubmit} form={form}>
        <Typography style={{ marginBottom: "1.5rem" }}>Add Data:</Typography>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="days_billed"
          label="Number of Billed Days"
          rules={[
            { required: true, message: "Number of billed days is required." },
          ]}
        >
          <Input
            type="number"
            min={0}
            max={dateRange[1].diff(dateRange[0], "days") + 1}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </Wrapper>
  );
}

export default FormComp;

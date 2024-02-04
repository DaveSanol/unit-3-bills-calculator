import { useState } from "react";
import styled from "styled-components";
import FormComponent from "./Form";
import Table from "./Table";
import DatePicker from "./DatePicker";
import { Button, Form, Typography, message } from "antd";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;

  h1,
  p {
    margin: 0;
  }

  .buttons-container {
    display: flex;
    gap: 0.5rem;
  }
`;

function App() {
  const [step, setStep] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [dateRange, setDateRange] = useState([]);
  const [data, setData] = useState([]);

  const [form] = Form.useForm();

  const handleClickNext = async () => {
    await form
      .validateFields()
      .then(() => setStep((step) => step + 1))
      .catch(() => message.error("Please input required fields."));
  };

  let content = (
    <DatePicker setDateRange={setDateRange} setTotalBill={setTotalBill} />
  );

  if (step < 1) {
    content = (
      <DatePicker setDateRange={setDateRange} setTotalBill={setTotalBill} />
    );
  } else if (step === 1) {
    content = (
      <FormComponent
        data={data}
        setData={setData}
        dateRange={dateRange}
        totalBill={totalBill}
      />
    );
  } else if (step > 1) {
    content = <Table dateRange={dateRange} data={data} totalBill={totalBill} />;
  }

  return (
    <Wrapper>
      <Typography.Title level={2}>2F Unit 3 Bills Calculator</Typography.Title>
      {step < 1 ? <Form form={form}>{content}</Form> : content}
      <div className="buttons-container">
        <Button onClick={() => setStep((step) => step - 1)} disabled={step < 1}>
          Previous
        </Button>
        <Button
          type="primary"
          onClick={
            step < 1 ? handleClickNext : () => setStep((step) => step + 1)
          }
          disabled={step > 1}
        >
          Next
        </Button>
      </div>
    </Wrapper>
  );
}

export default App;

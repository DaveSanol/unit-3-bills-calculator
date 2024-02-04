/* eslint-disable react/prop-types */
import { Form, DatePicker, Input } from "antd";

function DatePickerComp({ setDateRange, setTotalBill }) {
  return (
    <>
      <Form.Item
        name="range"
        label="Date Range (Start and End of Bill Date)"
        rules={[{ required: true, message: "Input valid date range." }]}
      >
        <DatePicker.RangePicker
          onChange={(v) => setDateRange(v)}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="bill"
        label="Total Bill:"
        rules={[{ required: true, message: "Input total bill." }]}
      >
        <Input
          type="number"
          min={1}
          onChange={(e) => setTotalBill(e.target.value)}
        />
      </Form.Item>
    </>
  );
}

export default DatePickerComp;

import React, { useState, Fragment } from "react";
import ApiService from "../../Shared/api";
import { Form, message, Button, Input, InputNumber, Select } from "antd";
import Layout from "../../Components/Layout/Layout";

const { Option } = Select;

type Book = {
  nazivKnjiga: string;
  brStrana: number;
  pismo: number;
  jezik: number;
  povez: number;
  format: number;
  izdavac: number;
  godinaIzdavanja: number;
  isbn: number;
  knjigaKolicina: number;
  kratki_sadrzaj: string;
  deletePdfs: number;
  categories: number[];
  genres: number[];
  authors: number[];
  pictures: [string, boolean][];
};

const onFinishFailed = () => {
  message.error("Provjeri formu");
};

const AddKnjiga: React.FC = () => {
  const [book, setBook] = useState<Book>({
    nazivKnjiga: "",
    brStrana: 0,
    pismo: 1,
    jezik: 1,
    povez: 1,
    format: 1,
    izdavac: 1,
    godinaIzdavanja: new Date().getFullYear(), // Default to the current year
    isbn: 0,
    knjigaKolicina: 0,
    kratki_sadrzaj: "",
    deletePdfs: 0,
    categories: [],
    genres: [],
    authors: [],
    pictures: [
      ["http://library.test/img/profile.jpg", true], // Default cover picture
    ],
  });
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const onFinish = async (values: Book) => {
    const bookData = { ...values };
    try {
      setStoring(true);
      const response = await ApiService.createBook(bookData);

      if (response.error) {
        setError(response.error);
        return;
      }

      message.success(response.data.message);
      setBook(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setStoring(false);
    }
  };

  return (
    <Fragment>
      <Layout title="Add Book">
        {error && <div>Error: {error}</div>}
        <div className="wrapper" style={{ padding: "20px" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ ...book }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<Book>
              label="Book Title"
              name="nazivKnjiga"
              rules={[
                { required: true, message: "Please input the book title!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Book>
              label="Number of Pages"
              name="brStrana"
              rules={[
                {
                  required: true,
                  message: "Please input the number of pages!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item<Book>
              label="Script"
              name="pismo"
              rules={[{ required: true, message: "Please select the script!" }]}
            >
              <Select>
                <Option value={1}>Latin</Option>
                <Option value={2}>Cyrillic</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item<Book>
              label="Language"
              name="jezik"
              rules={[
                { required: true, message: "Please select the language!" },
              ]}
            >
              <Select>
                <Option value={1}>English</Option>
                <Option value={2}>Serbian</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item<Book>
              label="Binding"
              name="povez"
              rules={[
                { required: true, message: "Please select the binding!" },
              ]}
            >
              <Select>
                <Option value={1}>Hardcover</Option>
                <Option value={2}>Paperback</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item<Book>
              label="Format"
              name="format"
              rules={[{ required: true, message: "Please select the format!" }]}
            >
              <Select>
                <Option value={1}>A4</Option>
                <Option value={2}>A5</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item<Book>
              label="Publisher"
              name="izdavac"
              rules={[
                { required: true, message: "Please select the publisher!" },
              ]}
            >
              <Select>
                <Option value={1}>Publisher 1</Option>
                <Option value={2}>Publisher 2</Option>
                {/* Add more options as needed */}
              </Select>
            </Form.Item>

            <Form.Item<Book>
              label="Publication Year"
              name="godinaIzdavanja"
              rules={[
                {
                  required: true,
                  message: "Please input the publication year!",
                },
                {
                  type: "number",
                  min: 1000,
                  max: new Date().getFullYear(),
                  message: "Invalid year!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item<Book>
              label="ISBN"
              name="isbn"
              rules={[
                { required: true, message: "Please input the ISBN!" },
                {
                  pattern: /^\d{13}$/,
                  message: "ISBN must be exactly 13 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Book>
              label="Quantity"
              name="knjigaKolicina"
              rules={[
                { required: true, message: "Please input the quantity!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item<Book>
              label="Short Description"
              name="kratki_sadrzaj"
              rules={[
                {
                  required: true,
                  message: "Please input a short description!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item<Book>
              label="Delete PDFs"
              name="deletePdfs"
              valuePropName="checked"
            >
              <Input type="checkbox" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={storing}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </Fragment>
  );
};

export default AddKnjiga;

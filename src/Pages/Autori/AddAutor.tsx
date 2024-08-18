import React, { useState, Fragment } from "react";
import ApiService from "../../Shared/api";
import { Form, message, Button, Input } from "antd";
import Layout from "../../Components/Layout/Layout";

type Author = {
  name: string;
  surname: string;
  biography: string;
  image: string;
};

const onFinishFailed = () => {
  message.error("Provjeri formu");
};

const AddAutor: React.FC = () => {
  const [author, setAuthor] = useState<Author>({
    name: "",
    surname: "",
    biography: "",
    image: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const onFinish = async (values: Author) => {
    const authorData = { ...values };
    try {
      setStoring(true);
      const response = await ApiService.createAuthor(authorData);

      if (response.error) {
        setError(response.error);
        return;
      }

      message.success(response.data.message);
      setAuthor(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setStoring(false);
    }
  };

  return (
    <Fragment>
      <Layout title="Add Author">
        {error && <div>Error: {error}</div>}
        <div className="wrapper" style={{ padding: "20px" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ ...author }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<Author>
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the author's name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Author>
              label="Surname"
              name="surname"
              rules={[
                {
                  required: true,
                  message: "Please input the author's surname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Author>
              label="Biography"
              name="biography"
              rules={[
                {
                  required: true,
                  message: "Please input the author's biography!",
                },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item<Author>
              label="Image URL"
              name="image"
              rules={[
                { required: true, message: "Please provide an image URL!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={storing}>
                Save Author
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </Fragment>
  );
};

export default AddAutor;

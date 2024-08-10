import React, { useState, Fragment } from "react";
import ApiService from "../../Shared/api";
import { Form, message, Button, Input } from "antd";
import { RuleObject } from "antd/lib/form";
import Layout from "../../Components/Layout/Layout";

type User = {
  name: string;
  surname: string;
  jmbg: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
};

const onFinishFailed = () => {
  message.error("Provjeri formu");
};

const AddUcenik: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const validatePasswordConfirmation = ({
    getFieldValue,
  }: any): RuleObject => ({
    validator(_: RuleObject, value: string) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  const onFinish = async (values: User) => {
    const userData = { ...values, role_id: 2 };
    try {
      setStoring(true);
      const response = await ApiService.createLibrarian(userData);

      if (response.error) {
        setError(response.error);
        return;
      }

      message.success(response.data.message);
      setUser(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setStoring(false);
    }
  };

  return (
    <Fragment>
      <Layout title="Ucenik">
        {error && <div>Error: {error}</div>}
        <div className="wrapper" style={{ padding: "20px" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ ...user }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<User>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
              label="Surname"
              name="surname"
              rules={[
                { required: true, message: "Please input your surname!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
              label="Jmbg"
              name="jmbg"
              rules={[
                { required: true, message: "Please input your jmbg!" },
                {
                  pattern: /^\d{13}$/,
                  message: "JMBG must be exactly 13 digits!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<User>
              label="Password Confirmation"
              name="password_confirmation"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                validatePasswordConfirmation,
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={storing}>
                Sačuvaj izmjene
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </Fragment>
  );
};

export default AddUcenik;

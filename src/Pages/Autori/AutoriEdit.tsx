import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { FormProps, message } from "antd";
import Layout from "../../Components/Layout/Layout";
import { Button, Form, Input } from "antd";

type FieldType = {
  name?: string;
  surname?: string;
  password?: string;
  password_confirmation?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
  message.error("Provjeri formu");
};

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
}

const AutorEdit: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storing, setStoring] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (id) {
      var idAsNumber = parseInt(id);
      storeUserData(idAsNumber, values);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getAuthor(id);

      if (response.error) {
        setError(response.error);
        return;
      }

      console.log("API Response:", response);

      setUser(response.data.data);
      setUserLoaded(true);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const storeUserData = useCallback(async (id: number, userData: User) => {
    try {
      setStoring(true);
      const response = await ApiService.updateAuthor(id, userData);

      if (response.error) {
        setError(response.error);
        return;
      }

      console.log("API Response:", response);

      message.success(response.data.message);

      setUser(response.data.data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setStoring(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <Layout title="Autor">
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!userLoaded && <div>Loading user...</div>}
        <div className="wrapper" style={{ padding: "20px" }}>
          {userLoaded && (
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
              <Form.Item<FieldType>
                label="Ime"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Prezime"
                name="surname"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                label="Confirm Password"
                name="password_confirmation"
                rules={[
                  { required: true, message: "Please confirm your password!" },
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
          )}
        </div>
      </Layout>
    </Fragment>
  );
};

export default AutorEdit;

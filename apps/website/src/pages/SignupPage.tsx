// src/pages/SignupPage.tsx
import React from "react";
import * as Form from "@radix-ui/react-form";
import { Box } from "@radix-ui/themes";

const SignupPage: React.FC = () => {
  return (
    <Box
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2>Sign Up</h2>
      <Form.Root>
        <Form.Field name="username">
          <Form.Label>Username</Form.Label>
          <Form.Control asChild>
            <input
              type="text"
              required
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="email">
          <Form.Label>Email</Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              required
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password">
          <Form.Label>Password</Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              required
              style={{ display: "block", width: "100%", marginBottom: "10px" }}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button type="submit" style={{ marginTop: "10px" }}>
            Sign Up
          </button>
        </Form.Submit>
      </Form.Root>
    </Box>
  );
};

export default SignupPage;
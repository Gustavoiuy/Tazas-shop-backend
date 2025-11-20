/**
 * @jest-environment node
 */
import mongoose from "mongoose";
import { conectDB, disconnectDB } from "../../src/config/configdb.js";

import app from "../../src/app.js";
import request from "supertest";

describe("Auth API", () => {

  test("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        username: "Gustavo",
        email: "gustavo@test.com",
        password: "trejo123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Usuario registrado con exito!!");
    
  });

  test("Debe logear un usuario", async () => {
    // Registramos
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        username: "Gustavo",
        email: "gustavo@test.com",
        password: "trejo123456"
      });

    // Login
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "gustavo@test.com",
        password: "trejo123456"
      });

    expect(res.statusCode).toBe(200);
    
  });

});

beforeAll(async () => {
  await conectDB();
});

afterAll(async () => {
  await disconnectDB();
});

import { createApp } from "@src/app.js";
import request from "supertest";

describe("end to end testing", () => {
  it("get request return response", async () => {
    const app = createApp();
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual("TypeScript + Express Server");
  });
});

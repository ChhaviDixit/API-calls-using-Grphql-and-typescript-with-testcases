const supertest = require("supertest");
const exp = require("chai").expect;
import {gApi} from './index';

let baseURL = supertest("http://localhost:4000/graphql");
let list_users = `{
    query{
      author {
        id
        firstName
        lastName
      }
    }
  }
  `;
describe("POST Request", () => {
  let post_resp;
  it("makes a POST call ", async () => {
    post_resp = await baseURL
      .get(list_users);
    await console.log(post_resp);
    //Do any other validation here.
  });
});
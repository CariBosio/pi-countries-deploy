/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, conn } = require("../../src/db.js");

const agent = session(app);
const countries = {
  name: "Argentina",
  id: "ARG",
  flags: "https://flagcdn.com/ar.svg",
  continents: "South America",
  capital: "Buenos Aires",
};

describe("Country", () => {
  before(async () => {
    await conn.sync({ force: true });
  });
  after(async () => {
    await conn.close();
  });
  describe("GET /countries", () => {
    it("should return all countries", async () => {
      await Country.create(countries);
      const res = await agent.get("/countries");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal(countries.name);
      expect(res.body[0].id).to.equal(countries.id);
      expect(res.body[0].flags).to.equal(countries.flags);
      expect(res.body[0].continents).to.equal(countries.continents);
      expect(res.body[0].capital).to.equal(countries.capital);
    });
  });
   
  describe("GET /countries/:id", () => {
    it("should return a country", async () => {
      const res = await agent.get(`/countries/${countries.id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.equal(countries.name);
      expect(res.body.id).to.equal(countries.id);
      expect(res.body.flags).to.equal(countries.flags);
      expect(res.body.continents).to.equal(countries.continents);
      expect(res.body.capital).to.equal(countries.capital);
    });
  })


describe("GET/countries?name=:name", () => {
  it("should return a country", async () => {
    const res = await agent.get(`/countries?name=${countries.name}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal(countries.name);
    expect(res.body[0].id).to.equal(countries.id);
    expect(res.body[0].flags).to.equal(countries.flags);
    expect(res.body[0].continents).to.equal(countries.continents);
    expect(res.body[0].capital).to.equal(countries.capital);
  });
});

})



 



















// describe("Country routes", () => {
//   before(() =>
//     conn.authenticate().catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     })
//   );
//   beforeEach(async() =>{
//     await conn.sync({ force: true });
//     const baseCountries = await Country.bulkCreate([
//       {name: "Argentina", id: "ARG", flags: "https://flag", continents: "South America", capital: "Buenos Aires"},
//       {name: "Bolivia", id: "BOL", flags: "https://flag", continents: "South America", capital: "La Paz"},
//       {name: "Brazil", id: "BRA", flags: "https://flag", continents: "South America", capital: "Brasilia"},
//     ]);
//     countries=JSON.parse(JSON.stringify(baseCountries));
//     // countries = countries.map((c) => ({...c, Activities: []}));
//   } );
//   it ("should get all countries", async () => {
//     const res = await agent.get("/countries");
//     expect(res.status).to.be.equal(200);
//     expect(res.body).to.be.deep.equal(countries);
//   } );
//   it ("should get a country by id", async () => {
//     const res = await agent.get("/countries/ARG");
//     expect(res.status).to.be.equal(200);
//     expect(res.body).to.be.deep.equal(countries[0]);
//   }
//   );
//   it( "should show a country when receiving a name by query", async() => {
//     const res = await agent.get("/countries?name=Argentina");
//     expect(res.status).to.be.equal(countries[2]);

//   } );

// });
     
   
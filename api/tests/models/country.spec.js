const { Country, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Country model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Country.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Country.create({ name: "Argentina" });
      });
    });

    describe("id", () => {
      it("should throw an error if id is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid id")))
          .catch(() => done());
      }),
        it("Deberia arrojar error si el id no es un STRING", (done) => {
          Country.create({
            id: 6,
          })
            .then(() => done("No deberia crearse"))
            .catch(() => done());
        });
    });

    describe("flags", () => {
      it("should throw an error if flags is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid flags")))
          .catch(() => done());
      }),
        it("Deberia arrojar error si flags no es un STRING", (done) => {
          Country.create({
            flags: 6,
          })
            .then(() => done("No deberia crearse"))
            .catch(() => done());
        });
    });

    describe("continents", () => {
      it("should throw an error if continents is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid continents")))
          .catch(() => done());
      }),
        it("Deberia arrojar error si continents no es un STRING", (done) => {
          Country.create({
            continents: 6,
          })
            .then(() => done("No deberia crearse"))
            .catch(() => done());
        });
    });

    describe("capital", () => {
      it("should throw an error if capital is null", (done) => {
        Country.create({})
          .then(() => done(new Error("It requires a valid capital")))
          .catch(() => done());
      }),
        it("Deberia arrojar error si capital no es un STRING", (done) => {
          Country.create({
            capital: 6,
          })
            .then(() => done("No deberia crearse"))
            .catch(() => done());
        });
    });

    describe("subregion", () => {
      it("Deberia arrojar error si flags no es un STRING", (done) => {
        Country.create({
          subregion: 6,
        })
          .then(() => done("No deberia crearse"))
          .catch(() => done());
      });
    });

    describe("area", () => {
      it("Deberia arrojar error si area es un STRING", (done) => {
        Country.create({
          area: "cincuenta",
        })
          .then(() => done("No deberia crearse"))
          .catch(() => done());
      });
    });

    describe("population", () => {
      it("Deberia arrojar error si population es un STRING", (done) => {
        Country.create({
          population: "cincuenta",
        })
          .then(() => done("No deberia crearse"))
          .catch(() => done());
      });
    });
  });
});

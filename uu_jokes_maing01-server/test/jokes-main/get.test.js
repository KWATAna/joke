const { TestHelper } = require("uu_appg01_server-test");

const CMD = "joke/get";
afterEach(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  let session = await TestHelper.login("AwidLicenseOwner", false, false);

  let dtoIn = {
    uuAppProfileAuthorities: "urn:uu:GGALL",
  };
  let result = await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});

describe("Testing the joke/get uuCmd...", () => {
  test("HDS", async () => {
   let session = await TestHelper.login("AwidLicenseOwner", false, false);
    /*await TestHelper.executeDbScript(`
      db.jokesMain.updateOne({awid: "${TestHelper.awid}" }, { $set: { state: "active" } });`);*/
    let createres = await TestHelper.executePostCommand("joke/create", { name: "Joke name" }, session);
    let result = await TestHelper.executeGetCommand("joke/get", { awid: createres.data.awid, id: createres.data.id  }, session);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});

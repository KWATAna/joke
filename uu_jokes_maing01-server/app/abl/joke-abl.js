"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { LoggerFactory } = require("uu_appg01_server").Logging;
const { AppClient } = require("uu_appg01_server");
const Errors = require("../api/errors/joke-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

const expectedStateList = ["active", "underConstruction"]

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("jokesMain");
    this.jokeDao = DaoFactory.getDao("joke");
  }
  
  async create(uri, dtoIn, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const uuJokeMain = await this.mainDao.getByAwid(awid)

    // HDS 1 Checks jokes state.

    if (!uuJokeMain) {
      throw new Errors.Create.jokesDoesNotExist({uuAppErrorMap}, {awid})
    }

    if (uuJokeMain.state !== 'underConstruction') {
      throw new Errors.Create.jokesIsNotInCorrectState({uuAppErrorMap}, {expectedStateList, actualState: uuJokeMain.state})
    }

    // HDS 2 - Validation of dtoIn.

    const validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    

    if (dtoIn.image) {
      // {...}
    }

    // HDS 4
    


    //HDS5 Creates the joke uuObject in the uuAppObjectStore (joke DAO create)

    const uuObject = { ...dtoIn, awid, averageRating: 0, ratingCount: 0,
       visibility: false, uuIdentity: session.getIdentity().getUuIdentity(),
       uuIdentityName: session.getIdentity().getName()};

    let joke = null;

    try {
      joke = await this.jokeDao.create(uuObject);
    } catch (err) {
      throw new Errors.Create.CreateJokeDaoFailed({ uuAppErrorMap }, err);
    }

     // HDS6 Returns properly filled dtoOut.

     return {
       uuAppErrorMap,
       ...joke
     }
  }


  async get(uri, dtoIn, session, uuAppErrorMap={}){

    const awid = uri.getAwid();
    const uuJokeMain = await this.mainDao.getByAwid(awid)
      // HDS 1 Checks jokes state.
    if (!uuJokeMain) {
        throw new Errors.Get.jokesDoesNotExist({uuAppErrorMap}, {awid})
      }
  
    if (uuJokeMain.state !== 'underConstruction') {
        throw new Errors.Get.jokesIsNotInCorrectState({uuAppErrorMap}, {expectedStateList, actualState: uuJokeMain.state})
      }



      // HDS 2 Validation of dtoIn.
      const validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.createUnsupportedKeys.code,
        Errors.Get.InvalidDtoIn
      );



      // HDS 3 Loads the joke uuObject from the uuAppObjectStore by id (through the joke DAO get).
        const uuObject = await this.jokeDao.get(awid, dtoIn.id)
        if(!uuObject){
          console.log(`${dtoIn.id} ${awid}`)
          throw new Errors.Get.JokeDoesNotExist({uuAppErrorMap},{awid})

        }


      // HDS 4 Returns properly filled dtoOut.

      return {
        uuObject,
        uuAppErrorMap
      }


  }
 

 
}

  

module.exports = new JokeAbl();
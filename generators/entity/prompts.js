/**
 * Copyright 2013-2017 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var config  = require('./config');

module.exports = {
  askForDBHost: askForDBHost,
  askForDBPort: askForDBPort,
  askForDBName: askForDBName,
  askForDBUserName: askForDBUserName,
  askForDBPassword: askForDBPassword,
  askForTableName: askForTableName,

  askForDomainName: askForDomainName,
  askForPackageName: askForPackageName,
  askForSubPackageName: askForSubPackageName,

  askForUseLombok: askForUseLombok
};

function askForDBHost() {
  // Don't prompt if there are no relationships
  const DBHost = this.DBHost || config.DBHost;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBHost',
      message: 'Please input the db host:',
      default: DBHost
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.DBHost !== this.DBHost) {
      this.DBHost = props.DBHost;
    }
    done();
  });
}
function askForDBPort() {
  // Don't prompt if there are no relationships
  const DBPort = this.DBPort || config.DBPort;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBPort',
      message: 'Please input the db port:',
      default: DBPort
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.DBPort !== this.DBPort) {
      this.DBPort = props.DBPort;
    }
    done();
  });
}

function askForDBName() {
  // Don't prompt if there are no relationships
  const DBName = this.DBName || config.DBName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBName',
      message: 'Please input the db name:',
      default: DBName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.DBName !== this.DBName) {
      this.DBName = props.DBName;
    }
    done();
  });
}

function askForDBUserName() {
  // Don't prompt if there are no relationships
  const DBUserName = this.DBUserName || config.DBUserName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBUserName',
      message: 'Please input the db username:',
      default: DBUserName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.DBUserName !== this.DBUserName) {
      this.DBUserName = props.DBUserName;
    }
    done();
  });
}

function askForDBPassword() {
  // Don't prompt if there are no relationships
  const DBPassword = this.DBPassword || config.DBPassword;

  const done = this.async();
  const prompts = [
    {
      type: 'password',
      name: 'DBPassword',
      message: 'Please input the db password:',
      default: DBPassword
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.DBPassword !== this.DBPassword) {
      this.DBPassword = props.DBPassword;
    }
    done();
  });
}

function askForTableName() {
  // Don't prompt if there are no relationships
  const entityTableName = this.entityTableName || config.entityTableName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'entityTableName',
      message: 'Please input table name:',
      default: entityTableName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.entityTableName !== this.entityTableName) {
      this.entityTableName = props.entityTableName;
    }
    done();
  });
}


function askForDomainName() {
  // Don't prompt if there are no relationships
  const domainName = this.domainName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'domainName',
      message: 'Please input the domain name:',
      default: domainName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.domainName !== this.domainName) {
      this.domainName = props.domainName;
    }
    done();
  });
}

function askForPackageName() {
  // Don't prompt if there are no relationships
  const packageName = this.packageName || config.packageName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'packageName',
      message: 'Please input the package name:',
      default: packageName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.packageName !== this.packageName) {
      this.packageName = props.packageName;
    }
    done();
  });
}

function askForSubPackageName() {
  // Don't prompt if there are no relationships
  const subPackageName = this.subPackageName || config.subPackageName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'subPackageName',
      message: 'Please input the sub-package name:',
      default: subPackageName
    }
  ];
  this.prompt(prompts).then(props => {
    /* Overwrite the table name for the entity using name obtained from the user */
    if (props.subPackageName !== this.subPackageName) {
      this.subPackageName = props.subPackageName;
    }
    done();
  });
}

function askForUseLombok() {
  const done = this.async()
  const prompts = [
    {
      type: 'confirm',
      name: 'useLombok',
      message: 'Please choose whether to use Lombok:',
      default: true
    }
  ]
  this.prompt(prompts).then(props => {
    this.useLombok = props.useLombok
    done()
  })
}

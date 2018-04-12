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
const chalk = require('chalk');
const path = require('path');
const _ = require('lodash');
const shelljs = require('shelljs');

/*module.exports = {
  askForDBConnURL,
  askForDBUserId,
  askForDBPassword,
  askForTableName,
  askForDomainName,
  askForPackageName
};*/

module.exports = {
  askForDBHost,
  askForDBPort,
  askForDBName,
  askForDBUserName,
  askForDBPassword,
  askForTableName,
  askForDomainName,
  askForPackageName,
  askForSubPackageName
};

function askForTableName() {
  // Don't prompt if there are no relationships
  const entityTableName = this.entityTableName;
  const prodDatabaseType = this.prodDatabaseType;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'entityTableName',
      message:
        'Please input table name:',
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


function askForDBHost() {
  // Don't prompt if there are no relationships
  const DBHost = this.DBHost;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBHost',
      message:
        'Please input the db host:',
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
  const DBPort = this.DBPort;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBPort',
      message:
        'Please input the db port:',
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
  const DBName = this.DBName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBName',
      message:
        'Please input the db name:',
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
  const DBUserName = this.DBUserName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBUserName',
      message:
        'Please input the db username:',
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
  const DBPassword = this.DBPassword;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'DBPassword',
      message:
        'Please input the db password:',
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

function askForDomainName() {
  // Don't prompt if there are no relationships
  const domainName = this.domainName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'domainName',
      message:
        'Please input the domain name:',
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
  const packageName = this.packageName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'packageName',
      message:
        'Please input the package name:',
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
  const subPackageName = this.subPackageName;

  const done = this.async();
  const prompts = [
    {
      type: 'input',
      name: 'subPackageName',
      message:
        'Please input the sub-package name:',
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

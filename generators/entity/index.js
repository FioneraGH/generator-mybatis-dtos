'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const shell = require('shelljs');
const prompts = require('./prompts');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.entityTableName = this.options.entityTableName;
    this.DBHost = this.options.DBHost;
    this.DBPort = this.options.DBPort;
    this.DBUserName = this.options.DBUserName;
    this.DBPassword = this.options.DBPassword;
    this.DBName = this.options.DBName;

    this.domainName = this.options.domainName;
    this.packageName = this.options.packageName;
    this.subPackageName = this.options.subPackageName;

    this.rootDir = this.destinationRoot();
  }

  get prompting() {
    // Have Yeoman greet the user.
    /* this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('generator-centlingbase') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }); */
    return {
      askForDBHost: prompts.askForDBHost,
      askForDBPort: prompts.askForDBPort,
      askForDBName: prompts.askForDBName,
      askForDBUserName: prompts.askForDBUserName,
      askForDBPassword: prompts.askForDBPassword,
      askForTableName: prompts.askForTableName,
      askForDomainName: prompts.askForDomainName,
      askForPackageName: prompts.askForPackageName,
      askForSubPackageName: prompts.askForSubPackageName
    };
  }

  writing() {
    /*    Shell.echo("=================================================");

    if (shell.which('java')) {
      shell.echo('find java command');
    }else {
      shell.echo('Sorry, this script requires git');
      shell.exit(1);
    } */

    // const done = this.async();

    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );

    var templateOptions = {};
    templateOptions.entityTableName = this.entityTableName;

    templateOptions.DBHost = this.DBHost;
    templateOptions.DBPort = this.DBPort;
    templateOptions.DBUserName = this.DBUserName;
    templateOptions.DBPassword = this.DBPassword;
    templateOptions.DBName = this.DBName;

    templateOptions.domainName = this.domainName;
    templateOptions.packageName = this.packageName;
    templateOptions.subPackageName = this.subPackageName;

    // 新增一个变量-domain的驼峰样式和小写样式
    templateOptions.lowerDomainName =
      this.domainName.substring(0, 1).toLowerCase() + this.domainName.substring(1);
    templateOptions.allLowerDomainName = this.domainName.toLowerCase();

    // Console.log("aabbccdd:",templateOptions);

    /* var myfile = this.templatePath('generatorConfig.xml');

    this.fs.copyTpl(
      this.templatePath('generatorConfig.xml'),
      this.destinationPath('generatorConfig.xml'),
      templateOptions
    ); */

    this.fs.copyTpl(
      this.templatePath('generatorConfig.xml'),
      this.destinationPath('generatorConfig.xml'),
      templateOptions
    );

    // Done();

    /* this.fs.commit([this.destinationPath() + "/!*"], function (err, file) {
      console.log("xxxxxxxxxxxxxxxxxx--------------=========================", file);
    }); */

    // console.log(this.sourceRoot());
    // console.log(this.templatePath())
    var cpargs = [
      this.templatePath() + '/copyfiles.sh',
      this.templatePath('mybatis-generator-core-1.3.6-SNAPSHOT.jar'),
      this.destinationPath('mybatis-generator-core-1.3.6-SNAPSHOT.jar'),
      this.templatePath('lib'),
      this.destinationPath('lib')
    ];

    // Console.log(cpargs);

    this.spawnCommandSync('bash', cpargs);

    if (!this.fs.exists(this.destinationPath('src/main/java'))) {
      this.spawnCommandSync('mkdir', ['-p', this.destinationPath('src/main/java')]);
    }

    if (!this.fs.exists(this.destinationPath('src/main/resources/mapper'))) {
      this.spawnCommandSync('mkdir', [
        '-p',
        this.destinationPath('src/main/resources/mapper')
      ]);
    }

    // This.spawnCommandSync('java', ['-jar',this.templatePath('mybatis-generator-core-1.3.6-SNAPSHOT.jar'),'-configfile', this.destinationPath('generatorConfig.xml'),'-overwrite']);
    var self = this;
    setTimeout(function() {
      if (
        shell.exec(
          'java -Djava.ext.dirs=./lib -jar ./lib/mybatis-generator-core-1.3.6-SNAPSHOT.jar -configfile generatorConfig.xml -overwrite'
        ).code !== 0
      ) {
        shell.echo('Error: mybatis generate failed');
        shell.exit(1);
      } else {
        var localPackageName = self.packageName;
        var packageNameTemp = localPackageName.replace('.', '/');
        var domainDir = self.destinationPath(
          'src/main/java/' + packageNameTemp + '/domain/' + self.subPackageName + '/'
        );
        var dtoDir = self.destinationPath(
          'src/main/java/' + packageNameTemp + '/domain/' + self.subPackageName + '/dto/'
        );

        if (!self.fs.exists(dtoDir)) {
          self.spawnCommandSync('mkdir', ['-p', dtoDir]);
        }

        /* Self.fs.copy(
          domainDir + self.domainName + ".java",
          dtoDir + self.domainName + "Dto.java"
        ); */

        // /创建dto文件
        var domainFileStr = self.fs.read(domainDir + self.domainName + '.java');
        var dtoFileStr = domainFileStr.replace(
          'class ' + self.domainName,
          'class ' + self.domainName + 'Dto'
        );
        // Console.log(dtoFileStr);
        dtoFileStr = dtoFileStr.replace(
          self.packageName + '.domain.' + self.subPackageName,
          self.packageName + '.domain.' + self.subPackageName + '.dto'
        );
        // Console.log(dtoFileStr);
        self.fs.write(dtoDir + self.domainName + 'Dto.java', dtoFileStr);

        // 创建mapstruct文件
        var mapStructSourceFile = self.templatePath(
          'src/com/base/controller/mapstruct/_EntityMapStruct.java'
        );
        var mapStructTargetDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/controller/mapstruct/' +
            self.subPackageName +
            '/'
        );
        var mapStructTargetFile = mapStructTargetDir + self.domainName + 'MapStruct.java';

        if (!self.fs.exists(mapStructTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', mapStructTargetDir]);
        }

        // Console.log(mapStructSourceFile, mapStructTargetDir, mapStructTargetFile);

        self.fs.copyTpl(mapStructSourceFile, mapStructTargetFile, templateOptions);

        // 创建Service和controller的路径，拷贝Service和controller
        var serviceSourceFilePath = self.templatePath(
          'src/com/base/service/_EntityService.java'
        );
        var serviceTargetDir = self.destinationPath(
          'src/main/java/' + packageNameTemp + '/service/' + self.subPackageName + '/'
        );
        if (!self.fs.exists(serviceTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', serviceTargetDir]);
        }
        self.fs.copyTpl(
          serviceSourceFilePath,
          serviceTargetDir + self.domainName + 'Service.java',
          templateOptions
        );

        var controllerSourceFilePath = self.templatePath(
          'src/com/base/controller/_EntityController.java'
        );
        var controllerTargetDir = self.destinationPath(
          'src/main/java/' + packageNameTemp + '/controller/' + self.subPackageName + '/'
        );
        if (!self.fs.exists(controllerTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', controllerTargetDir]);
        }
        self.fs.copyTpl(
          controllerSourceFilePath,
          controllerTargetDir + self.domainName + 'Controller.java',
          templateOptions
        );
      }
      // Copy controller service mapstruct dto
    }, 2000);
  }

  install() {
    this.installDependencies();
  }

  /* Method1() {
    this.log('method 1 just ran');
  }

  method2() {
    this.log('method 2 just ran');
  } */

  end() {
    /* Shell.mkdir("src");
    // shell.cp(this.templatePath('generatorConfig.xml'), this.destinationPath('generatorConfig.xml'));
    shell.cp(this.templatePath('mybatis-generator-core-1.3.5.jar'), this.destinationPath('mybatis-generator-core-1.3.5.jar'));
    shell.cp(this.templatePath('mysql-connector-java-5.1.38.jar'), this.destinationPath('mysql-connector-java-5.1.38.jar'));

    // Run external tool synchronously
    if (shell.exec('java -jar mybatis-generator-core-1.3.5.jar -configfile generatorConfig.xml -overwrite').code !== 0) {
      shell.echo('Error: mybatis generate failed');
      shell.exit(1);
    } */
  }
};

'use strict';
const Generator = require('yeoman-generator');
// import { Generator } from 'yeoman-generator';
const shell  = require('shelljs');
const prompts = require('./prompts');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    console.log('preparing generator');

    this.DBHost = this.options.DBHost;
    this.DBPort = this.options.DBPort;
    this.DBName = this.options.DBName;
    this.DBUserName = this.options.DBUserName;
    this.DBPassword = this.options.DBPassword;
    this.entityTableName = this.options.entityTableName;

    this.domainName = this.options.domainName;
    this.packageName = this.options.packageName;
    this.subPackageName = this.options.subPackageName;

    this.rootDir = this.destinationRoot();
  }

  get prompting() {
    // Have Yeoman greet the user.
    console.log('prompting configuaration');
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
    shell.echo('=================================================');

    if (shell.which('java')) {
      shell.echo('Find java command');
      shell.echo('=================================================');
    } else {
      shell.echo('Sorry, this script requires java framework');
      shell.echo('=================================================');
      shell.exit(1);
    }

    var templateOptions = {};
    templateOptions.DBHost = this.DBHost;
    templateOptions.DBPort = this.DBPort;
    templateOptions.DBName = this.DBName;
    templateOptions.DBUserName = this.DBUserName;
    templateOptions.DBPassword = this.DBPassword;
    templateOptions.entityTableName = this.entityTableName;

    templateOptions.domainName = this.domainName;
    templateOptions.packageName = this.packageName;
    templateOptions.subPackageName = this.subPackageName;

    // 新增一个变量-domain的驼峰样式和小写样式
    templateOptions.lowerDomainName =
      this.domainName.substring(0, 1).toLowerCase() +
      this.domainName.substring(1);
    templateOptions.allLowerDomainName = this.domainName.toLowerCase();

    // 由于没找到覆盖参数，临时判断删除
    if (this.fs.exists(this.destinationPath('generatorConfig.xml'))) {
      this.fs.delete(this.destinationPath('generatorConfig.xml'));
    }

    this.fs.copyTpl(
      this.templatePath('generatorConfig.xml'),
      this.destinationPath('generatorConfig.xml'),
      templateOptions
    );

    var cpargs = [
      this.templatePath() + '/copyfiles.sh',
      this.templatePath('lib'),
      this.destinationPath('lib')
    ];

    this.spawnCommandSync('bash', cpargs);

    if (!this.fs.exists(this.destinationPath('src/main/java'))) {
      this.spawnCommandSync('mkdir', [
        '-p',
        this.destinationPath('src/main/java')
      ]);
    }

    if (!this.fs.exists(this.destinationPath('src/main/resources/mapper'))) {
      this.spawnCommandSync('mkdir', [
        '-p',
        this.destinationPath('src/main/resources/mapper')
      ]);
    }

    var self = this;
    setTimeout(function() {
      if (
        shell.exec(
          'java -Djava.ext.dirs=./lib -jar ./lib/mybatis-generator-core-1.3.6.jar -configfile generatorConfig.xml -overwrite'
        ).code !== 0
      ) {
        shell.echo('Error: mybatis generate failed');
        shell.exit(1);
      } else {
        var localPackageName = self.packageName;
        var packageNameTemp = localPackageName.replace('.', '/');
        var domainDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/domain/' +
            self.subPackageName +
            '/'
        );
        var dtoDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/domain/' +
            self.subPackageName +
            '/dto/'
        );

        if (!self.fs.exists(dtoDir)) {
          self.spawnCommandSync('mkdir', ['-p', dtoDir]);
        }

        // 创建dto文件
        var domainFileStr = self.fs.read(domainDir + self.domainName + '.java');
        var dtoFileStr = domainFileStr.replace(
          'class ' + self.domainName,
          'class ' + self.domainName + 'Dto'
        );
        dtoFileStr = dtoFileStr.replace(
          self.packageName + '.domain.' + self.subPackageName,
          self.packageName + '.domain.' + self.subPackageName + '.dto'
        );
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
        var mapStructTargetFile =
          mapStructTargetDir + self.domainName + 'MapStruct.java';

        if (!self.fs.exists(mapStructTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', mapStructTargetDir]);
        }

        self.fs.copyTpl(
          mapStructSourceFile,
          mapStructTargetFile,
          templateOptions
        );

        // 创建Service和controller的路径，拷贝Service和controller
        var serviceSourceFilePath = self.templatePath(
          'src/com/base/service/_EntityService.java'
        );
        var serviceTargetDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/service/' +
            self.subPackageName +
            '/'
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
          'src/main/java/' +
            packageNameTemp +
            '/controller/' +
            self.subPackageName +
            '/'
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
    }, 3000);
  }

  install() {
    console.log('install');
    // this.installDependencies({
    //   bower: false,
    //   yarn: false,
    //   npm: false
    // });
  }

  end() {
    console.log('end');
  }
}

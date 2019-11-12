'use strict';
const Generator = require('yeoman-generator');
// import { Generator } from 'yeoman-generator';
const shell = require('shelljs');
const rimraf = require('rimraf');
const prompts = require('./prompts');
const fileSys = require('fs');

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
    this.useLombok = this.options.useLombok;

    this.rootDir = this.destinationRoot();
  }

  get prompting() {
    // Have Yeoman greet the user.
    console.log('prompting configuaration');
    return prompts;
  }

  writing() {
    const self = this;

    // 由于没找到覆盖参数，临时判断删除
    if (fileSys.existsSync(this.destinationPath('generatorConfig.xml'))) {
      const done = this.async();
      const prompts = [
        {
          type: 'confirm',
          name: 'delConfig',
          message: 'Note: generatorConfig.xml already exists. Delete it? :',
          default: true
        }
      ];
      this.prompt(prompts).then(props => {
        if (props.delConfig) {
          done();
          fileSys.unlinkSync(this.destinationPath('generatorConfig.xml'));
          self._processing(self);
        }
      });
    } else {
      self._processing(self);
    }
  }

  install() {
    // console.log("install");
    // this.installDependencies({
    //   bower: false,
    //   yarn: false,
    //   npm: false
    // });
  }

  end() {
    // console.log("end");
  }

  _processing(self) {
    // shell.echo("=================================================");
    if (shell.which('java')) {
      // shell.echo("Find java command");
      // shell.echo("=================================================");
    } else {
      shell.echo('Sorry, this script requires java framework');
      // shell.echo("=================================================");
      shell.exit(1);
    }

    let templateOptions = {};
    templateOptions.DBHost = self.DBHost;
    templateOptions.DBPort = self.DBPort;
    templateOptions.DBName = self.DBName;
    templateOptions.DBUserName = self.DBUserName;
    templateOptions.DBPassword = self.DBPassword;
    templateOptions.entityTableName = self.entityTableName;

    templateOptions.domainName = self.domainName;
    templateOptions.packageName = self.packageName;
    templateOptions.subPackageName = self.subPackageName;
    templateOptions.useLombok = self.useLombok;

    // 新增一个变量-domain的驼峰样式和小写样式
    templateOptions.lowerDomainName =
      self.domainName.substring(0, 1).toLowerCase() +
      self.domainName.substring(1);
    templateOptions.allLowerDomainName = self.domainName.toLowerCase();
    // 新增一个下划线风格的变量,用于controller当中
    templateOptions.underScoreCaseDomainName = templateOptions.lowerDomainName.replace(/([A-Z])/g,"_$1").toLowerCase();

    self.fs.copyTpl(
      self.templatePath('generatorConfig.xml'),
      self.destinationPath('generatorConfig.xml'),
      templateOptions
    );

    let cpargs = [
      self.templatePath() + '/copyfiles.sh',
      self.templatePath('lib'),
      self.destinationPath('lib')
    ];

    self.spawnCommandSync('bash', cpargs);

    if (!fileSys.existsSync(self.destinationPath('src/main/java'))) {
      self.spawnCommandSync('mkdir', [
        '-p',
        self.destinationPath('src/main/java')
      ]);
    }

    if (
      !fileSys.existsSync(self.destinationPath('src/main/resources/mapper'))
    ) {
      self.spawnCommandSync('mkdir', [
        '-p',
        self.destinationPath('src/main/resources/mapper')
      ]);
    }

    setTimeout(function() {
      if (
        shell.exec(
          'java -Djava.ext.dirs=./lib -jar ./lib/mybatis-generator-core-1.3.7.jar -configfile generatorConfig.xml -overwrite'
        ).code !== 0
      ) {
        shell.echo('Error: mybatis generate failed');
        shell.exit(1);
      } else {
        const localPackageName = self.packageName;
        const packageNameTemp = localPackageName.replace('.', '/');
        const domainDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/domain/' +
            self.subPackageName +
            '/'
        );
        const dtoDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/domain/' +
            self.subPackageName +
            '/dto/'
        );

        if (!fileSys.existsSync(dtoDir)) {
          self.spawnCommandSync('mkdir', ['-p', dtoDir]);
        }

        // 创建DTO文件
        const domainFileStr = self.fs.read(
          domainDir + self.domainName + '.java'
        );
        const dtoFileStr = domainFileStr
          .replace(
            'class ' + self.domainName,
            'class ' + self.domainName + 'DTO'
          )
          .replace(
            self.packageName + '.domain.' + self.subPackageName,
            self.packageName + '.domain.' + self.subPackageName + '.dto'
          );
        self.fs.write(dtoDir + self.domainName + 'DTO.java', dtoFileStr);

        // 创建MapStruct文件
        const mapStructSourceFile = self.templatePath(
          'src/com/base/controller/mapstruct/_EntityMapStruct.java'
        );
        const mapStructTargetDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/controller/mapstruct/' +
            self.subPackageName +
            '/'
        );
        const mapStructTargetFile =
          mapStructTargetDir + self.domainName + 'MapStruct.java';

        if (!fileSys.existsSync(mapStructTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', mapStructTargetDir]);
        }

        self.fs.copyTpl(
          mapStructSourceFile,
          mapStructTargetFile,
          templateOptions
        );

        // 创建Service和Controller的路径，拷贝Service和Controller
        const serviceSourceFilePath = self.templatePath(
          'src/com/base/service/_EntityService.java'
        );
        const serviceTargetDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/service/' +
            self.subPackageName +
            '/'
        );
        if (!fileSys.existsSync(serviceTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', serviceTargetDir]);
        }
        self.fs.copyTpl(
          serviceSourceFilePath,
          serviceTargetDir + self.domainName + 'Service.java',
          templateOptions
        );

        const controllerSourceFilePath = self.templatePath(
          'src/com/base/controller/_EntityController.java'
        );
        const controllerTargetDir = self.destinationPath(
          'src/main/java/' +
            packageNameTemp +
            '/controller/' +
            self.subPackageName +
            '/'
        );
        if (!fileSys.existsSync(controllerTargetDir)) {
          self.spawnCommandSync('mkdir', ['-p', controllerTargetDir]);
        }
        self.fs.copyTpl(
          controllerSourceFilePath,
          controllerTargetDir + self.domainName + 'Controller.java',
          templateOptions
        );
      }

      // self._deleteFolder(self.destinationPath('lib/'));
      rimraf('lib', function(err) {
        console.log(err);
      });
    }, 2000);
  }

  _deleteFolder(self, path) {
    let files = [];
    if (fileSys.existsSync(path)) {
      files = fileSys.readdirSync(path);
      files.forEach(function(file, index) {
        const curPath = path + '/' + file;
        if (fileSys.statSync(curPath).isDirectory()) {
          // recurse
          self._deleteFolder(curPath);
        } else {
          fileSys.unlinkSync(curPath);
        }
      });
      fileSys.rmdirSync(path);
    }
  }
};

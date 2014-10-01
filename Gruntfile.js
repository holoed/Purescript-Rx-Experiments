module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({ 

    psc: {
      options: {
        main: "Gattaca.Experiments.Main",
        modules: ["Gattaca.Experiments.Main"]
      },
      all: {
        src: [ "src/**/*.purs"
             , "bower_components/**/src/**/*.purs"],
        dest: "dist/example.js"
      }
    },
  
    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],
    
    clean: ["tmp", "output"],
  
    pscMake: {
      lib: {
        src: ["<%=libFiles%>"]
      },
      tests: {
        src: ["tests/Tests.purs", "<%=libFiles%>"]
      }
    },

    dotPsci: ["<%=libFiles%>"],
 
    copy: [
      {
        expand: true,
        cwd: "output",
        src: ["**"],
        dest: "tmp/node_modules/"
      }, {
        src: ["js/index.js"],
        dest: "tmp/index.js"
      }
    ],

    execute: {
      tests: {
        src: "tmp/index.js"
      }
    }      
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-execute")
  grunt.loadNpmTasks("grunt-purescript");
 
  grunt.registerTask("test", ["pscMake:tests", "copy", "execute:tests"]);
  grunt.registerTask("make", ["pscMake:lib", "dotPsci"]);
  grunt.registerTask("deploy", ["psc:all"]);
  grunt.registerTask("default", ["clean", "make", "test", "deploy"]);
};

var path = require('path');
var fs = require('fs');
var exec = require('child_process').execSync;
var config = require(path.join(__dirname,'config.js'));
var parse_tree = require(path.join(__dirname,'parse_tree.js'));
var code_gen = {
	init : function(){
           this.gen_mods.config.root_obj = this;
           this.extras.build_file_tree();
           this.task_route(parse_tree['index']);
	},
	task_route : function(task){
                  switch(task){
                  	  case 'build':
                  	  this.task_controller(parse_tree['var']);
                  	  break;
                  }
	},
	task_controller : function(mods){
                          var mods_table = [];
                          var build_unit = function(reg,lib){
                                      var mod_unit = {};
 				               	      mod_unit.reg = reg;
				               	      mod_unit.lib = lib;
                                      mods_table.push(mod_unit);

                                   }
	                      for (var i =0;i<mods.length;i++){
				               switch(mods[i]){
				               	   case 'jquery':
				               	      build_unit('bower','jquery');
				               	      break;
				               	   case 'frigate':
				               	      build_unit('bower','frigate');
				               	      break;

				               	   case 'bootstrap':
                                       build_unit('bower','bootstrap');
				               	      break;
				               	   case 'sass':
                                       build_unit('npm','sass');
				               	      break;
				               	   case 'less':
                                       build_unit('bower','less');
				               	      break;

				               	   case 'angular':
                                       build_unit('npm','angular');
				               	      break;
				               	   case 'grunt':
                                       build_unit('npm','grunt');
				               	      break;

				               }
	                      }
	                     this.gen_mods.init(mods_table);
	},

	gen_mods :{
		  init : function(mods_table){
		  	     var $this = this;
                 mods_table.forEach(function(val,key){

                      $this[val.reg](val.lib);
                 	    
                 })
		  },
          bower : function(lib){
          	       var root = this.config.root_obj;
          	       var query = 'bower i '+lib+' --save';
          	       console.log('installing.. '+lib);
                   exec(query,function(err,stdout,stderr){
                   	      if(err){
                   	      	 console.log('this is system err : '+err);
                   	      }else if(stderr){
                   	      	 console.log('this is stderr'+stderr);
                   	      }
                   	      
                   });



          },
          npm : function(lib){
          	    //console.log('npm i '+lib);
          	     /*
          	       var root = this.config.root_obj;
          	       root.extras.spinner.start('installing angular..');
     
                   exec('bower i jquery',function(err,stdout,stderr){
                   	          if(err || stderr){
                   	          	console.log(err || stderr);
                   	          }else{
                                 root.extras.spinner.stop('installed jquery');
                   	          }
                   }); */


          },
          config : {}

	   },
    extras : {
          init : function(){

          },

          spinner : {},
          build_file_tree: function(){
          	    if(!fs.existsSync('bower.json')){
          	    	fs.openSync('bower.json','w');
          	    	var bower_src = fs.readFileSync(config.doc_root+'/assets/data/bower.json','utf8'); 
          	    	fs.writeFileSync('bower.json',bower_src);
          	    }
          }
	   }

}
module.exports = code_gen;
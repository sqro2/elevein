var parser = {
	 init : function(argv){
	 	     var t_stream = this.to_tokens(this.preprocessor(argv));
	 	     
						     if(this.is_valid(t_stream)){
				                this.struc_data(t_stream);
				                console.log(this.parse_tree);
						     }else{
						     	this.emit('error','0');
						     }
		 },
	 to_tokens : function(str){
		         var t_array = [];
		         var c_head = [];
		         var c_body = [];
			     for(var i =0;i<str.length;i++){
					     switch(str[i]){
							    case 'build'     :
							    case 'project'   :
							    case 'angular'   :
							    case 'jquery'    :
							    case 'bootstrap' :
							    case 'sass'      :
							    case 'less'      :
							    case 'grunt'     :
							    case 'gulp'      :
	                                if(i<2){
	                                	c_head.push(str[i]);
	                                }else{
                                        c_body.push(str[i])
	                                }
								
							 }
				 }
				 t_array.push(c_head);
				 t_array.push(c_body);
				 return t_array;
		 },
		 
	 struc_data : function(t_array){
	 	          var head = ((t_array[0].toString()).replace(',',' ')).toLowerCase();
	 	          var body = t_array[1];
	 	          switch(head){
	 	          	    case 'build project' :
				 	          	 this.parse_tree['index'] = 'build';
				 	          	 this.parse_tree['var'] = body;
				 	          	 break;
				 	    default :
				 	          	 this.parse_tree['index'] = 'null';
				 	          	 this.parse_tree['var'] = 'null';
				 	          	 break;


	 	                   }
		                   
		 },
	 parse_tree : {},
	 preprocessor : function(str){
	 	            var count =  0;
		 	            while(count<2){
		 	            	str.shift();
		 	            	count++;
		 	            }
	 	            return str;
	 },
	 is_valid : function(str){
                if(str.length>0){
                	return true;
                }else{
                	return false;
                }
	 },
	 emit : function(type,code){
              switch(type){
              	  case 'error':
              	    switch(code){
              	    	case '0':
              	    	   console.warn('an error occurd - code 0');
              	    	   break;
              	    };
              	    break;
              }
	 }
	
}

module.exports = parser;
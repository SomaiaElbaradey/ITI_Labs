# to-do list cli that contains the following commands: 

1 - Users can add entry

     Options:
      -t / --title indicates the title of entry, ( required) 
     Example:
      node index.js add -t “To do entry”  


2 - Users Can list Entries

      All entries:
        node index.js list
      list Specific status using -s -- status
        Options: 
          -s/--status  one of the values [“to-do”,  “in progress” ,”done”] (optional parameter)
        Example: 
           node index.js list -s “done” 


3 - Users can edit their entry 

    through the id
	  Options: 
	    -t / --title: for editing title (required)
	    -i/ --id : id (required)
    Examples
       node index.js edit -t “Edited title” --id  123 
        ===> will edit entry with id  123  to be “Edited title”
    Users can mark their entry as done by id 
		Options: 
		    -s/--status one of the values [“to-do”,”in progress”,”done”]
    Examples: 
        node index.js edit -s “done” -t “Edited title” --id 123 
       
       
4- Entries is added by default with status property which has “to-do” value

5 - Users can delete their entry using their id

    Example
		  node index.js delete 123 


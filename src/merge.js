hasRowConflictAt: function(rowIndex) {
      var targetRow = this.get(rowIndex)
      var pieceCount = 0;
      for(var i = 0; i < targetRow.length; i++){
        if(targetRow[i]){
          pieceCount++
        }
      }
      if(pieceCount >= 2){
        return true
      }
      else{
      return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows()
      var conflictFound = false;
      for(var i = 0; i < rows.length; i++){
        if(!conflictFound){
          if(this.hasRowConflictAt(i)){
            conflictFound = true;
          }
        }
     }
     return conflictFound; 


    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var row;
      var rowlengths = this.get(0).length; 
      var colModel = [];
      var pieceCount = 0;
      for(var i = 0 ; i < rowlengths; i++){
        row = this.get(i);
        colModel.push(row[colIndex]);
      }
      for(var i = 0; i < rowlengths; i++){
        if(colModel[i]){
          pieceCount++
        }
      }
      if(pieceCount >= 2){
        return true
      }
      else{
      return false;
      }

    },

    ////////////////////////////////////////////////////////
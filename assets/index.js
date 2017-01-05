$(function () {
    var $table = $('#table')

  var c = []
  var a = []
  $.get('/r.json', function(res){
    var obj = res.data[0]
    console.log(obj)
    
    for (var key in obj) {
      var val = obj[key]
      
      if (typeof val === 'object') {
        var _arr = []
        var _count = 0
        for (var newKey in val) {
          _arr.push({
              field: newKey,
              title: newKey,
              align: 'center',
              valign: 'middle'
          })
          
          a.push(_arr)
        }
        c.push({
            field: key,
            title: key,
            rowspan: _arr.length,
            align: 'center',
            valign: 'middle'
        })
      } else {
        c.push({
            field: key,
            title: key,
            align: 'center',
            valign: 'middle'
        })
      }
    }
  
    for(var i in a){
      c.push(a[i])
    }
    
    
    console.log(c)
    
    $table.bootstrapTable({
        columns: c
     });
    
  })

});

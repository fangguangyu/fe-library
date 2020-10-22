
function createData(deep, breadth) {
  var data = {};
  var temp = data; 
  console.log(temp);

  for(var i = 0; i < deep; i++) {
    /**
     * 第1层循环：data['data'] = {}, temp = {}, temp = data;
     * 第2层循环：data['data']['data'] = {}, temp = {}, temp = data;
     */
    temp = temp['data'] = {}; 
    for(var j = 0; j < breadth; j++) {
      /**
       * 第1层循环：data['data'][0] = 0;
       * 第2层循环：data['data'][1] = 1;
       */
      temp[j] = j;
    }
  }

  return data;
}

createData(1, 3) // 1层深度，每层有3个数据{data: {0:0, 1:1, 2:2}}
createData(3, 0) // 3层深度, 每层有0个数据{data: {data: {data: {}}}}
